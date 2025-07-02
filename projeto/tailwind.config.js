/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Cores baseadas no tema Chakra existente
                primary: {
                    50: '#e6fffa',
                    100: '#b3f5f0',
                    200: '#80ebe5',
                    300: '#4de1da',
                    400: '#1ad7cf',
                    500: '#88ccca', // grassTeal do tema original
                    600: '#6db3b1',
                    700: '#529a98',
                    800: '#37817f',
                    900: '#1c6866',
                },
                background: {
                    light: '#f0e7db',
                    dark: '#202023',
                },
                text: {
                    light: '#202023',
                    dark: '#f0e7db',
                },
                accent: {
                    light: '#3d7aed',
                    dark: '#ff63c3',
                }
            },
            fontFamily: {
                'heading': ['M PLUS Rounded 1c', 'sans-serif'],
                'body': ['M PLUS Rounded 1c', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-in-out',
                'slide-up': 'slideUp 0.8s ease-in-out',
                'slide-down': 'slideDown 0.8s ease-in-out',
                'rotate': 'rotate 0.3s ease-in-out',
                'bounce-soft': 'bounceSoft 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(20deg)' },
                },
                bounceSoft: {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-10px)' },
                    '60%': { transform: 'translateY(-5px)' },
                },
            },
            backdropBlur: {
                'xs': '2px',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
