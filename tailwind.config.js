module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        dm: "'DM Sans', sans-serif",
        inter: "'Inter', sans-serif",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      borderWidth: {
        1: "1px",
      },
      colors: {
        dark: {
          700: "#242731",
          800: "#1f2128",
          900: "#191b20",
        },
      },
    },
  },
  plugins: [],
};
