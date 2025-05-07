// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // make sure Tailwind scans your React files
    ],
    theme: {
      extend: {
        fontFamily: {
          inder: ['Inder', 'sans-serif'],
          hammersmith: ['Hammersmith One', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  