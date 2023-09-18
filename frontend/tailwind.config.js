/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [
        { pattern: /text-./ },
      ],
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "chat": "url('/static/bg-chat.png')",
      },
      colors: {
        primary: {
          DEFAULT: "#128EFE",
          light: "#E5EEFF",
          dark: "#1671C2",
        },
      },
      height: {
        "main-screen": "calc(100vh - 50px)"
      },
      width: {
        "drawer-full": "calc(100% - 256px)",
      },
    },
  },
  plugins: [],
};
