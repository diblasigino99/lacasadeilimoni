/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:   "#F9F9F7",
        charcoal: "#1A1A1A",
        lemon:    "#F4D03F",
        capri:    "#A8C4D4",
        linen:    "#F0EDE4",
        mist:     "#E8E5DC",
      },

      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans:  ["Montserrat", "system-ui", "sans-serif"],
      },

      fontSize: {
        "2xs":    ["0.65rem", { lineHeight: "1.6", letterSpacing: "0.15em" }],
        eyebrow:  ["0.56rem", { lineHeight: "1",   letterSpacing: "0.42em" }],
      },

      letterSpacing: {
        widest: "0.42em",
        ultra:  "0.5em",
      },

      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "30":  "7.5rem",
        "36":  "9rem",
        "72":  "18rem",
        "84":  "21rem",
        "96":  "24rem",
        "128": "32rem",
      },

      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk:   "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      transitionDuration: {
        "400":  "400ms",
        "600":  "600ms",
        "800":  "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
        "1500": "1500ms",
      },

      backgroundImage: {
        "lemon-glow": "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(244,208,63,0.07), transparent 70%)",
        vignette:     "radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.04) 100%)",
      },

      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float:        "float 6s ease-in-out infinite",
        "line-draw":  "lineDraw 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        lineDraw: {
          from: { transform: "scaleX(0)" },
          to:   { transform: "scaleX(1)" },
        },
      },

      screens: {
        xs:    "390px",
        sm:    "640px",
        md:    "768px",
        lg:    "1024px",
        xl:    "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
