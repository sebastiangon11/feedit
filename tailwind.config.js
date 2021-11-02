module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      inset: ["active"],
      ringColor: ["active"],
      ringWidth: ["active"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
  // mode: "jit",
};
