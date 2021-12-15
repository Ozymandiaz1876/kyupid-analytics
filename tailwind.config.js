module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: {
          light: "#ECB365",
          DEFAULT: "#ECB365",
          dark: "#ECB365",
        },
        secondary: {
          light: "#064663",
          DEFAULT: "#064663",
          dark: "#064663",
        },
        dark: {
          light: "#04293A",
          DEFAULT: "#04293A",
          dark: "#04293A",
        },
        darker: {
          light: "#041C32",
          DEFAULT: "#041C32",
          dark: "#041C32",
        },
      },
      height: {
        94: "94.333333%",
      },
      translateX: {
        "-110": "110%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
