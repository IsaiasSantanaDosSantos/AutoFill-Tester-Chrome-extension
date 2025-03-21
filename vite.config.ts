import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
// import terser from "@rollup/plugin-terser";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // terser({
    //   mangle: {
    //     reserved: ["observerTimeout", "observerDisconnected"],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: "index.html", // Mantém o HTML principal
        background: path.resolve(__dirname, "src/feature/background.ts"),
        content: path.resolve(__dirname, "src/feature/content.ts"),
      },
      output: {
        entryFileNames: (chunk) => {
          return chunk.name === "background" || chunk.name === "content"
            ? "[name].js" // Mantém background.js e content.js na raiz de dist
            : "assets/[name].[hash].js"; // Mantém outros arquivos em assets/
        },
        assetFileNames: "assets/[name].[hash][extname]", // Mantém os CSS e outros assets em assets/
      },
    },
  },
});
