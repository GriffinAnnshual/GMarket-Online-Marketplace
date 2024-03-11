import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react()],
	optimizeDeps: {
		exclude: ["js-big-decimal"],
	},
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000/",
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, "http://localhost:3000/api"),
			},
		},
	},
})
