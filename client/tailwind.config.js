/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.{html,js,ts,tsx}",
    "./src/**/*.{html,js,ts,tsx}",
  ],
  theme: {
    transitionDuration: {
      DEFAULT: "300ms",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
