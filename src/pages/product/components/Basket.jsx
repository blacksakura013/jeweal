import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const Basket = ({ basket, onRemove, onConfirm ,onExpire}) => {
  const items = basket.products || [];
 
  // State แยกสำหรับ loader ของแต่ละรายการ
  const [deleteLoadingMap, setDeleteLoadingMap] = useState({});

  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const [timeLeft, setTimeLeft] = useState(
    basket?.createdAt ? Math.max(2 * 60 * 1000 - (new Date() - new Date(basket.createdAt)), 0) : 0
  );
  

  useEffect(() => {
    if (!basket?.createdAt) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        2 * 60 * 1000 - (new Date() - new Date(basket.createdAt)),
        0
      );
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onExpire(); // เรียก callback เพื่อลบ booking ทั้งหมด
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [basket?.createdAt, onExpire]);

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
                  <p className="font-medium">{item.sku || item.sn}</p>
                  <p className="text-sm text-gray-500">
                    {item.metal || "-"} — {item.price?.toLocaleString() || 0}{" "}
                    THB
                  </p>
                </div>
                {deleteLoadingMap[item.sn] ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRemove(item.sn)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                )}
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
