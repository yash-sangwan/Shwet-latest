/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightpurple: '#DEC3FD',
        shwetorange: '#eab308',
        byzantium : '#702963',
        primary :"#EAB308",
        secondary:"#CA8A04",
        primaryText:"#FFFFFF",
        secondaryText:"#BDBDBD",
        primaryBg:"#000000",
        inputfied:"#f4f2f4",
        blureffect:"#0f172a",

        PURPLESHADE1: "#050224",
        PURPLESHADE2: "#6400F6",
        PURPLESHADE3: "#A28FF8",
        PURPLESHADE4: "#150A4C",
        PURPLESHADE5: "#5909D9",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Lora: ["Lora", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      maxWidth: {
        'mobile': '100vw',
        'tablet': '786px',
        'desktop': '1024px',   
        'extralarge': '1536px',   
      },
      screens: {
          exsm : "300px",
          esm : "480px"
      }
    },
  },
  plugins: [],
}