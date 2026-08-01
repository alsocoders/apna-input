import { defineConfig } from "tsup"
import { copyFileSync, mkdirSync } from "node:fs"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    }
  },
  onSuccess() {
    mkdirSync("dist", { recursive: true })
    copyFileSync("src/styles/apna-input.css", "dist/styles.css")
  },
})
