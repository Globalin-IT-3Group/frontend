module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        nicomoji: ["Nico Moji", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },

  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar"),
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
