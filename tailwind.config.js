module.exports = {
  content: [
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/templates/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif"],
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "hover", "focus", "last"],
  },
}
