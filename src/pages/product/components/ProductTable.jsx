import React from "react";
import { FaImage, FaShoppingCart } from "react-icons/fa";

const ProductTable = ({ data, onAdd }) => (
  <div className="overflow-y-auto border rounded-lg shadow-sm">
    <table className="min-w-full bg-white border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
        <tr>
          <th className="px-3 py-3 text-left">Image</th>
          <th className="px-3 py-3 text-left">SN</th>
          <th className="px-3 py-3 text-left">SKU</th>
          <th className="px-3 py-3 text-left">Metal</th>
          <th className="px-3 py-3 text-center">Qty</th>
          <th className="px-3 py-3 text-right">Price (THB)</th>
          <th className="px-3 py-3 text-center">Status</th>
          <th className="px-3 py-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
            <td className="px-6 py-1.5 flex items-center gap-2">
              {item.img && item.img !== "N/A" ? (
                <img
                  src={item.img}
                  alt={item.sku}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaImage size={24} />
                </div>
              )}
            </td>
            <td className="px-3 py-2">{item.sn}</td>
            <td className="px-3 py-2">{item.sku}</td>
            <td className="px-3 py-2">{item.metal}</td>
            <td className="px-3 py-2 text-center">{item.qty}</td>
            <td className="px-3 py-2 text-right">{item.price.toLocaleString()}</td>
            <td className="px-3 py-2 text-center">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  item.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {item.status}
              </span>
            </td>
            <td className="px-3 py-2 text-center">
              <button
                onClick={() => onAdd(item)}
                className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 flex items-center gap-1"
              >
                <FaShoppingCart /> Add
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
