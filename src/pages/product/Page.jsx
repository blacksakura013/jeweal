import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import Basket from "./components/Basket";
import BookingService from "./services/bookingService";
import ProductService from "./services/productService";

export default function ProductPage() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const productService = new ProductService(token);
  const bookingService = new BookingService(token);

  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState({
    products: [],
    bookingId: null,
    createdAt: null,
    expiresAt: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pageState, setPageState] = useState("product");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef(null);
  const spinnerRef = useRef(null);
  const basketRef = useRef(basket);

  useEffect(() => {
    basketRef.current = basket;
  }, [basket]);

  /** 🟢 โหลดข้อมูลสินค้า */
  const fetchProducts = async () => {
    try {
      const productsData = await productService.getAllProducts();
      console.log(productsData);
      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  /** 🟢 โหลด booking ของผู้ใช้ */
  const fetchUserBooking = async () => {
    try {
      const bookingsData = await bookingService.getAllBookings();
      const userBooking = bookingsData.find((b) => b.status === "pending");

      if (userBooking) {
        setBasket({
          bookingId: userBooking.bookingId,
          products: userBooking.products || [],
          createdAt: userBooking.createdAt,
          expiresAt: userBooking.expiresAt || null,
        });

        if (userBooking.expiresAt) startCountdown(userBooking.expiresAt);
      } else {
        setBasket({
          products: [],
          bookingId: null,
          createdAt: null,
          expiresAt: null,
        });
        setTimeLeft(0);
      }
    } catch (err) {
      console.error("Error fetching user booking:", err);
    }
  };

  /** 🟢 โหลดข้อมูลสินค้า + การจองของผู้ใช้ */
  const fetchData = async () => {
    await fetchProducts();
    await fetchUserBooking();
  };

  useEffect(() => {
    fetchData();
    return () => clearInterval(timerRef.current);
  }, []);

  /** 🕒 ตั้งเวลาหมดอายุ 2 นาที ด้วย interval */
  const startCountdown = (expiresAt) => {
    clearInterval(timerRef.current);

    const updateTime = () => {
      const remaining = Math.max(new Date(expiresAt).getTime() - Date.now(), 0);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        handleExpire();
      }
    };

    updateTime();
    timerRef.current = setInterval(updateTime, 1000);
  };

  /** ❌ หมดเวลา คืนสินค้าเข้าคลัง + โหลดข้อมูลใหม่ */
  const handleExpire = async () => {
    if (!basketRef.current.bookingId) return;

    alert("⏰ หมดเวลา 2 นาที! ระบบกำลังรีเซ็ตตะกร้าและสินค้าของคุณ");

    setLoading(true);
    clearInterval(spinnerRef.current);

    spinnerRef.current = setTimeout(async () => {
      await fetchData();

      setBasket({
        products: [],
        bookingId: null,
        createdAt: null,
        expiresAt: null,
      });
      setTimeLeft(0);
      setLoading(false);
    }, 3000);
  };

  const filtered = products.filter(
    (p) =>
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.items.some((item) =>
        item.sn.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const totalUnits = basket.products.length;

  /** 🛒 เพิ่มสินค้าเข้า basket */
  const handleAdd = async ({ productId, selectedItems }) => {
    if (!selectedItems || selectedItems.length === 0) {
      alert("กรุณาเลือกจำนวนสินค้าที่ต้องการก่อน");
      return;
    }

    try {
      // หาเฉพาะ SN ที่ว่าง (available)
      const product = products.find((p) => p._id === productId);
      if (!product) return;

      const availableSNs = product.items
        .filter((i) => i.status === "available" && selectedItems.includes(i.sn))
        .map((i) => i.sn);

      if (availableSNs.length === 0) {
        alert("สินค้าที่เลือกหมดแล้ว");
        return;
      }

      const newBooking = await bookingService.createBooking(
        availableSNs.map((sn) => ({ sn }))
      );
      if (!newBooking) return;

      await fetchData();

      // อัปเดต products state → ลบเฉพาะ SN ที่ถูกจองออก
    } catch (err) {
      console.error(err);
    }
  };

  /** ❌ ลบสินค้าออกจากการจอง */
  const handleRemove = async (snToRemove) => {
    if (!basket.bookingId) return;
    try {
      await bookingService.removeItemsFromBooking(basket.bookingId, [
        { sn: snToRemove },
      ]);

      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  /** ✅ ยืนยันการขาย */
  const handleConfirm = async (bookingId) => {
    if (!bookingId) return;
    setLoading(true);
    try {
      const confirmed = await bookingService.confirmBooking(bookingId);
      if (confirmed) {
        alert(`✅ ขายสินค้าสำเร็จ ${confirmed.salesCount} รายการ`);
        await fetchData();
      }
    } catch (err) {
      console.error(err);
      alert("❌ ไม่สามารถยืนยันการขายได้");
    }
    setLoading(false);
  };

  /** 🧩 UI */
  return (
    <div className="h-screen w-full grid grid-cols-8 bg-gray-50">
      <Sidebar totalUnits={totalUnits} setPageState={setPageState} />

      <div className="col-span-7 h-full flex flex-col p-4 overflow-y-auto bg-white">
        <div className="flex items-center justify-between mb-4">
          <header>
            <h1 className="text-xl font-bold text-gray-800">
              {pageState === "product" ? "Product List" : "Your Basket"}
            </h1>
            <p className="text-sm text-gray-500">
              {pageState === "product"
                ? `Showing ${filtered.length} results`
                : `Total items: ${totalUnits}`}
            </p>
          </header>

          {pageState === "product" && (
            <div className="flex gap-2 w-full max-w-sm">
              <input
                type="text"
                placeholder="Search by SN or SKU"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button
                onClick={async () => {
                  try {
                    await productService.recoverProducts();
                    await fetchData();
                    alert("✅ กู้คืนสินค้าสำเร็จ");
                  } catch (err) {
                    console.error(err);
                    alert("❌ ไม่สามารถกู้คืนสินค้าได้");
                  }
                }}
                className="px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-md"
              >
                🔄 Recovery
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        ) : pageState === "product" ? (
          <ProductTable data={filtered} onAdd={handleAdd} />
        ) : (
          <Basket
            basket={basket}
            timeLeft={timeLeft}
            onRemove={handleRemove}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}
