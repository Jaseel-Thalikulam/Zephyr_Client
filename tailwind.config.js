/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "xs": "576px",
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontSize: {
        'xxs': '0.65rem'  // Define a smaller text size than text-xs
      },
      colors: {
       
        primary: '#FF6347', 
        secondary: '#6495ED', 

      },
      textColor: {
        primary: '#4a5d68', 
        secondary: '#4a5d68', 
      },
    },
  },
  plugins: [],
}
