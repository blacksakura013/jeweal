import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-black">Welcome</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 sm:shadow sm:rounded-lg sm:px-10 sm:border sm:border-gray-200">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`py-4 px-1 border-b-2 flex-1 text-center transition-colors ${
                activeTab === "login"
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign in
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`py-4 px-1 border-b-2 flex-1 text-center transition-colors ${
                activeTab === "register"
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Create account
            </button>
          </div>

          {/* Forms */}
          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
