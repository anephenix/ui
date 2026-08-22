import { globSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import esbuild from "esbuild";

// @sveltejs/package copies .svelte files as-is rather than bundling them,
// so a per-component `import "@anephenix/ui-tokens/components/x/X.css"`
// would ship unresolved to consumers (ui-tokens is a private workspace
// package, not published). Instead we bundle every token stylesheet into
// one dist/index.css here, matching how packages/react ships its CSS —
// Svelte components just render class names, with no CSS import of their own.
const componentCss = globSync("../../tokens/components/*/*.css", {
	cwd: import.meta.dirname,
}).sort();

const entryContents = [
	'@import "@anephenix/ui-tokens/design-system/index.css";',
	...componentCss.map(
		(file) => `@import "${path.resolve(import.meta.dirname, file)}";`,
	),
].join("\n");

// Written inside the package (not os.tmpdir()) so esbuild's node_modules
// walk-up can still find the @anephenix/ui-tokens workspace symlink.
const entryFile = path.resolve(import.meta.dirname, "../.css-entry.tmp.css");
writeFileSync(entryFile, entryContents);

try {
	await esbuild.build({
		entryPoints: [entryFile],
		bundle: true,
		outfile: path.resolve(import.meta.dirname, "../dist/index.css"),
	});
} finally {
	rmSync(entryFile, { force: true });
}
