/** @type {import('tailwindcss').Config} */
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
        extend: {
            colors: {
                lightBlue: "#3C7CFF",
                faintBlue: "#F5F8FF",
            },
        },
    },
    plugins: [],
};
