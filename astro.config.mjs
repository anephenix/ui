import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react()],
	srcDir: "./site",
	outDir: "./site-dist",

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					includePaths: ["node_modules", "design-system"],
				},
			},
		},
	},

	adapter: cloudflare(),
});
