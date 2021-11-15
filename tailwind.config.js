module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./public/**/*.html",
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    safelist: [
      "bg-orange",
      "bg-lgrey",
      "bg-gdblue",
      "bg-dblue",
      "bg-grey",
      "bg-gblue", "text-gblue",
      "bg-blue", "text-blue", 
      "bg-white", "text-white", "text-dblue",
      "w-[112px]", "w-[256px]","hover:bg-lorange","bg-dwhite","hover:bg-blue"
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens:{
      'md': {'max': '970px'},
      'mm': {'max':'800px'},
      'sm': {'max': '530px'},
      'lg': '531px',
      'xl': '1280px',
      '2xl': '1536px',


    },
    extend: {},
    textColor: {
      transparent: "transparent",
      orange: "#FDA214",
      lgrey: "#BCCED9",
      gdblue: "#304859",
      dblue: "#152938",
      grey: "#DFE7EC",
      gblue: "#7191A5",
      blue: "#6395B8",
      white: "#FCFCFC",

      green: "green",
      red: "red",
    },
    colors: {
      transparent: "transparent",
      orange: "#FDA214",
      lgrey: "#BCCED9",
      gdblue: "#304859",
      dblue: "#152938",
      grey: "#F2F2F2",
      gblue: "#7191A5",
      blue: "#6395B8",
      dwhite: "#DFE7EC",
      lorange:"#FFB84A",
      white:"#FFFFFF",
      green: "green",
      red: "red",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
