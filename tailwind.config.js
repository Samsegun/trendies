/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            manrope: ["Manrope", "serif"],
            sans: ["Graphik", "sans-serif"],
        },
        screens: {
            xs: "355px",
            ...defaultTheme.screens,
        },
        extend: {
            colors: {
                lightBlue: "#3C7CFF",
                faintBlue: "#F5F8FF",
            },
        },
    },
    plugins: [],
};
