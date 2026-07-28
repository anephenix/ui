import esbuild from "esbuild";

esbuild
	.build({
		entryPoints: ["index.jsx"],
		bundle: true,
		outfile: "dist/index.js",
		platform: "browser",
		format: "esm",
		jsx: "automatic",
		external: [
			"react",
			"react-dom",
			"react-highlight",
			"clipboard-copy",
			"react-syntax-highlighter",
		],
	})
	.catch((e) => console.error(e.message));
