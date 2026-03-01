@type {import('tailwindcss').Config}
export default
{
    content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme:
    {
        extend:
        {
            colors:
            {
                brandBg: 'var(--bg-color)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                brandText: 'var(--text-color)',
                brandTextSecondary: 'var(--text-secondary)',
            },
        },
    },
    plugins: [],
};
