import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//Access Key
// gFVz3ix39gJEWLMdqQyTGpTMV_K1GLGK6zMC2-LWxWw

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
