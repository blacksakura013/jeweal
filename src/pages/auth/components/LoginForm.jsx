import { useState } from "react"; 
import AuthService from "../services/authService"; // adjust path if needed

export default function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await AuthService.login({ username, password });
      console.log("Login success:", result);

      // Save user info and token to localStorage
      localStorage.setItem("user", JSON.stringify(result));

      // Navigate to Product page
     window.location.href="/Product";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="space-y-6 pt-6" onSubmit={handleLogin}>
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
      <button
        type="submit"
    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
     
        Sign in
      </button>
    </form>
  );
}
