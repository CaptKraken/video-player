module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      color: {
        "ck-green": {
          DEFAULT: "#68D391",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
