export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#07080d',
        surface2: '#11131a',
        accent: '#a855f7',
        accentSoft: '#7c3aed',
      },
      boxShadow: {
        glow: '0 0 40px rgba(168, 85, 247, 0.18)',
      },
    },
  },
  plugins: [],
};
