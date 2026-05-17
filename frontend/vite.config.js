import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
   define: {
     __API_URL__: JSON.stringify(
       import.meta.env && import.meta.env.MODE === 'production'
         ? (import.meta.env.VITE_API_URL || '/api')
         : undefined
     ),
   },
})