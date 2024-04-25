import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 8000,
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, "/api")
			}
		}
	},
	resolve: {
		//路径别名设置：vite
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	}
});
