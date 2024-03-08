const react = require('@vitejs/plugin-react');
const reactRefresh = require('@vitejs/plugin-react-refresh');

module.exports = {
  plugins: [
    react(),
    reactRefresh(),
  ],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
