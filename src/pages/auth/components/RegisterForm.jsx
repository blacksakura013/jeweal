import React, { useState } from "react";
import AuthService from "../services/authService";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const result = await AuthService.register({ username, password, confirmPassword });
      console.log("Register success:", result);
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <form className="space-y-6 pt-6" onSubmit={handleRegister}>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-gray-700">User Name</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          required
          className="mt-1 w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
        />
      </div>
      <button
        type="submit"
       class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
    
        Create account
      </button>
    </form>
  );
}
