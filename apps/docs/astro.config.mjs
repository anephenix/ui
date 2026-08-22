import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";

export default defineConfig({
	integrations: [react(), svelte()],
	srcDir: "./site",
	outDir: "./site-dist",
	adapter: cloudflare(),
});
