module.exports = {
  mode: 'jit',
  darkMode: false,
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    // The classes are passed dynamically by Contentful -- don't purge them just because they're not used in the codebase
    safelist: [
      'self-auto',
      'self-start',
      'self-end',
      'self-center',
      'text-left',
      'text-center',
      'text-right',
      'lg:text-left',
      'lg:text-center',
      'lg:text-right',
      'lg:grid-cols-1',
      'lg:grid-cols-2',
      'lg:grid-cols-3',
      'lg:grid-cols-4',
    ],
  },
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
