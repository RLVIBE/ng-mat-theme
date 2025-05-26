/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // don't use tailwind color system, use angular material color theme (m3 theme)
      },
      fontSize: {
        caption: ['.75rem', { lineHeight: '.9375rem', letterSpacing: '.4px' }], // text-caption
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disable preflight to avoid conflicts with Angular Material styles
  },
}
