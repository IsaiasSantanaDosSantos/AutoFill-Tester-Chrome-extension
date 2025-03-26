import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
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
        editFormJs: path.resolve(__dirname, "src/pages/EditForm/editForm.tsx"),
        editFormHtml: path.resolve(__dirname, "editForm.html"),
      },
      output: {
        entryFileNames: (chunk) => {
          if (["background", "content", "editFormJs"].includes(chunk.name)) {
            return "[name].js"; // Mantém arquivos principais na raiz de dist
          }
          return "assets/[name].[hash].js";
        },
        assetFileNames: "assets/[name].[hash][extname]", // Mantém os CSS e outros assets em assets/
      },
    },
  },
});
