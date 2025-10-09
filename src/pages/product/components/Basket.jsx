import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const Basket = ({ basket, onRemove, onConfirm, timeLeft }) => {
  const items = basket.products || [];
  const [deleteLoadingMap, setDeleteLoadingMap] = useState({});
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
 

 
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleRemove = async (sn) => {
    setDeleteLoadingMap((prev) => ({ ...prev, [sn]: true }));
    try {
      await onRemove(sn);
    } finally {
      setDeleteLoadingMap((prev) => ({ ...prev, [sn]: false }));
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <FaShoppingCart /> Basket ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">Your basket is empty.</p>
      ) : (
        <>
          <p className="text-sm text-red-500 mb-2">
            ⏰ Time left: {formatTime(timeLeft)}
          </p>

          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.sn}
                className="py-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{`${item.name} (${item.metal})`}</p>
                  <p className="text-sm text-gray-500">{`S/N: ${item.sn || "-"}`}</p>
                </div>

                <div className="flex flex-col items-end ml-auto">
                  <p className="text-sm text-gray-500">{`${item.price?.toLocaleString() || 0} THB`}</p>
                  {deleteLoadingMap[item.sn] ? (
                    <div className="w-5 h-5 border-4 border-t-4 border-gray-200 rounded-full animate-spin mt-1"></div>
                  ) : (
                    <button
                      onClick={() => handleRemove(item.sn)}
                      className="text-red-500 hover:text-red-700 mt-1"
                    >
                      <FaTrashAlt />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t pt-2 flex justify-between font-semibold">
            <span>Total:</span>
            <span>{totalPrice.toLocaleString()} THB</span>
          </div>

          <button
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold"
            onClick={() => onConfirm(basket.bookingId)}
          >
            🛒 Order Now
          </button>
        </>
      )}
    </div>
  );
};

export default Basket;
