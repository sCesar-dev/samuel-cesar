/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'primary-green': '#39ff14',
                'primary-bg': 'zinc-950',
                'secondary-bg': '#171e26',
                'text-light': '#FFFFFF',
                'border-silver': '#c5c6c7',
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};