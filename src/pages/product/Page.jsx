import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductTable from "./components/ProductTable";
import Basket from "./components/Basket";
import ProductService from "./services/productService";
import BookingService from "./services/bookingService";

export default function ProductPage() {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const productService = new ProductService(token);
  const bookingService = new BookingService(token);

  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState({
    products: [],
    bookingId: null,
    expiresAt: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pageState, setPageState] = useState("product");
  const [loading, setLoading] = useState(false);
  const [Delete_Loading, setDelete_Loading] = useState(false);
  // โหลดสินค้าและ booking ของ user
  const fetchData = async () => {
    try {
      const productsData = await productService.getAllProducts();
      setProducts(productsData);

      const bookingsData = await bookingService.getAllBookings();
      const userBooking = bookingsData.find((b) => b.status === "pending");

      if (userBooking) {
        setBasket({
          ...userBooking,
          bookingId: userBooking.bookingId,
          products: userBooking.products || [],
          expiresAt: userBooking.expiresAt || null,
        });
      } else {
        setBasket({ products: [], bookingId: null, expiresAt: null });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnits = basket.products.length;

  // เพิ่มสินค้าเข้า basket
  const handleAdd = async (item) => {
    try {
      let bookingId = basket.bookingId;
      if (!bookingId) {
        const newBooking = await bookingService.createBooking([
          { sn: item.sn },
        ]);
        if (!newBooking) return;
        setBasket({
          ...newBooking,
          bookingId: newBooking._id,
          products: [item],
          expiresAt: newBooking.expiresAt,
        });
      } else {
        await bookingService.addItemsToBooking(bookingId, [{ sn: item.sn }]);
        setBasket((prev) => ({
          ...prev,
          products: [...prev.products, item],
        }));
      }
      setProducts((prev) => prev.filter((p) => p._id !== item._id));
    } catch (err) {
      console.error(err);
    }
  };

  // ลบสินค้าออกจาก basket
  const handleRemove = async (sn) => {
    if (!basket.bookingId) return;
    try {
      await setDelete_Loading(true);
      await bookingService.removeItemsFromBooking(basket.bookingId, [{ sn }]);
      await fetchData();
      await setDelete_Loading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleExpire = async () => {
    if (!basket.bookingId) return;
    try {
      await bookingService.removeItemsFromBooking(
        basket.bookingId,
        basket.products.map((p) => ({ sn: p.sn }))
      );
      setBasket({ products: [], bookingId: null, expiresAt: null });
      await fetchData();
      alert("⏰ Booking expired. All items returned to stock.");
    } catch (err) {
      console.error(err);
    }
  };
  // ยืนยันการขายสินค้า
  const handleConfirm = async (bookingId) => {
    await setLoading(true);
    if (!bookingId) return;
    try {
      const confirmed = await bookingService.confirmBooking(bookingId);
      if (confirmed) {
        alert(`✅ Sale confirmed! Total items sold: ${confirmed.salesCount}`);
      
        await fetchData(); // รีเฟรชสินค้าและ booking ของผู้ใช้
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to confirm sale.");
    }
    await setLoading(false);
  };

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
                    alert("กู้คืนสินค้าสำเร็จแล้ว ✅");
                  } catch (err) {
                    console.error(err);
                    alert("ไม่สามารถกู้คืนสินค้าได้ ❌");
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
            onRemove={handleRemove}
            onConfirm={handleConfirm}
            setDelete_Loading={setDelete_Loading}
            onExpire={handleExpire}
          />
        )}
      </div>
    </div>
  );
}
