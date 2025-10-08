/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8", // ใช้ในโค้ดคุณ
          500: "#6366f1",
        },
        back: {
          50: "#f9fafb", // สีพื้นหลังอ่อน ๆ
        },
      },
    },
  },
  plugins: [],
}
