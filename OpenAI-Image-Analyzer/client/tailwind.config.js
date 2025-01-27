/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Include your HTML files
    "./src/**/*.{js,ts,jsx,tsx}", // Include your JavaScript and TypeScript files
  ],
  theme: {
    extend: {
      fontFamily: {
        // lobster: ['lobster', 'serif'], // Adding Google Font
      },
    },
  },
  plugins: [], // Add any plugins you're using
};
