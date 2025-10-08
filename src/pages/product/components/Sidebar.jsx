import React from "react";
import { FaShoppingBasket, FaBoxOpen } from "react-icons/fa";

const Sidebar = ({ totalUnits, setPageState }) => {
  const handleLogout = () => {
    localStorage.removeItem("user"); // ลบข้อมูล user
    window.location.href = "/"; // กลับหน้า login
  };

  return (
    <div className="col-span-1 h-full border-r border-gray-200 bg-white flex flex-col">
      <div
        className="p-4 flex justify-start items-center cursor-pointer"
        onClick={() => setPageState("product")}
      >
        <span className="text-2xl font-bold text-primary-500">JEWEAL</span>
      </div>

      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-1 mx-1 mt-2">
          <div
            onClick={() => setPageState("product")}
            className="flex items-center justify-center lg:justify-start h-12 px-6 text-primary-600 font-bold bg-primary-50 rounded-md hover:bg-primary-100 cursor-pointer"
          >
            <FaBoxOpen className="text-xl" />
            <span className="ml-3.5 hidden lg:block">Products</span>
          </div>

          <div
            onClick={() => setPageState("basket")}
            className="relative flex items-center justify-center lg:justify-start h-12 px-6 text-primary-600 font-bold bg-primary-50 rounded-md hover:bg-primary-100 cursor-pointer"
          >
            <FaShoppingBasket className="text-xl" />
            <span className="ml-3.5 hidden lg:block">Basket</span>
            {totalUnits > 0 && (
              <span className="absolute top-2 right-5 lg:right-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {totalUnits}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1 mx-1 mb-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center lg:justify-start h-12 px-6 text-red-400 hover:text-red-600 font-semibold rounded-md w-full"
          >
            <span className="ml-3.5 hidden lg:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
