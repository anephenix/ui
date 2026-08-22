import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [svelte()],
	resolve: {
		conditions: ["browser"],
	},
	test: {
		environment: "jsdom",
		globals: true,
		clearMocks: true,
		include: ["src/**/*.test.ts"],
		coverage: {
			provider: "v8",
			reportsDirectory: "coverage",
			reporter: ["text", "lcov"],
		},
	},
});
