import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // agar React ishlatilsa
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
