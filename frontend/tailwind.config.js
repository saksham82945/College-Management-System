module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B22A1E', // Galgotias Red
        secondary: '#F59E0B', // Yellow/Orange
        accent: '#1D4ED8', // Blue
        dark: '#1F2937',
        light: '#F3F4F6',
        surface: '#ffffff',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
};
