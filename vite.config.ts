import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), precachePlugin()],
})

function precachePlugin(): Plugin {
  return {
    name: "precache-plugin",

    generateBundle(_options, bundle) {
      const archivos = Object.keys(bundle).map((archivo) => `/${archivo}`)

      this.emitFile({
        type: "asset",
        fileName: "precache-manifest.json",
        source: JSON.stringify(["/", ...archivos])
      })
    }
  }
}
