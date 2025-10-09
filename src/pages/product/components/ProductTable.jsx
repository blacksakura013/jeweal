// src/components/ProductTable.jsx
import React, { useState } from "react";
import { FaImage, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";

 
const ProductTable = ({ data, onAdd }) => {
  const [qtyMap, setQtyMap] = useState({}); // { productId: selectedQty }

  const handleQtyChange = (productId, next, maxQty) => {
    if (next < 0) next = 0;
    if (next > maxQty) next = maxQty;
    setQtyMap((prev) => ({ ...prev, [productId]: next }));
  };

  const handleAddClick = (product) => {
    const selectedQty = qtyMap[product._id] || 0;
    if (selectedQty === 0) {
      alert("กรุณาเลือกจำนวนสินค้าก่อน");
      return;
    }

    // กรองเฉพาะ SN ที่ available เท่านั้น
    const availableItems = product.items.filter(
      (i) => i.status === "available"
    );

    if (availableItems.length < selectedQty) {
      alert("สินค้ามีไม่เพียงพอสำหรับการจอง");
      return;
    }

    // ส่งเป็น array ของ SN strings (ตามที่ ProductPage ต้องการ)
    const selectedItems = availableItems
      .slice(0, selectedQty)
      .map((it) => it.sn);

    // ส่งกลับไปยัง parent ด้วยโครงสร้างที่ตรงกัน
    onAdd({
      productId: product._id,
      selectedItems, // ['SN001', 'SN002', ...]
      selectedQty, // number
    });
  
    // รีเซ็ตตัวเลือก
    setQtyMap((prev) => ({ ...prev, [product._id]: 0 }));
  };

  return (
    <div className="overflow-y-auto border rounded-lg shadow-sm">
      <table className="min-w-full bg-white border">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-3 py-3 text-left">Image</th>
            <th className="px-3 py-3 text-left">SKU</th>
            <th className="px-3 py-3 text-left">Name</th>
            <th className="px-3 py-3 text-right">Price (THB)</th>
            <th className="px-3 py-3 text-right">Available Qty</th>
            <th className="px-3 py-3 text-right">Select Qty</th>
            <th className="px-3 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => {
            const availableQty = product.items.filter(
              (i) => i.status === "available"
            ).length;
            const selectedQty = qtyMap[product._id] || 0;

            return (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-1.5 flex items-center gap-2">
                  {product.img && product.img !== "N/A" ? (
                    <img
                      src={product.img}
                      alt={product.sku}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                      <FaImage size={24} />
                    </div>
                  )}
                </td>

                <td className="px-3 py-2">{product.sku}</td>
                <td className="px-3 py-2">{`${product.name} (${product.metal})`}</td>
                <td className="px-3 py-2 text-right">
                  {product.price.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">{availableQty}</td>

                <td className="px-3 py-2 text-right">
                  <div className="inline-flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() =>
                        handleQtyChange(
                          product._id,
                          selectedQty - 1,
                          availableQty
                        )
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                      type="button"
                    >
                      <FaMinus size={12} />
                    </button>

                    <input
                      type="number"
                      className="w-16 text-center px-1"
                      min={0}
                      max={availableQty}
                      value={selectedQty}
                      onChange={(e) => {
                        let val = parseInt(e.target.value || "0", 10);
                        if (isNaN(val)) val = 0;
                        if (val > availableQty) val = availableQty;
                        if (val < 0) val = 0;
                        setQtyMap((prev) => ({ ...prev, [product._id]: val }));
                      }}
                    />

                    <button
                      onClick={() =>
                        handleQtyChange(
                          product._id,
                          selectedQty + 1,
                          availableQty
                        )
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300"
                      type="button"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </td>

                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => handleAddClick(product)}
                    disabled={availableQty === 0 || selectedQty === 0}
                    className={`px-3 py-1 rounded-md flex items-center gap-1 justify-center ${
                      availableQty === 0 || selectedQty === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primary-500 hover:bg-primary-600 text-white"
                    }`}
                  >
                    <FaShoppingCart /> Add
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
