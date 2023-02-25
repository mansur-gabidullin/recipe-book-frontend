import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    resolve: { alias: [{ find: "@", replacement: resolve(__dirname, "./src") }] },
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://0.0.0.0:9000",
                changeOrigin: true,
            },
        },
    },
});
