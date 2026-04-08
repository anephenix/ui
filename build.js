import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

esbuild
	.build({
		entryPoints: ["index.jsx"],
		bundle: true,
		outfile: "dist/index.js",
		plugins: [sassPlugin()],
		platform: "browser",
		format: "esm",
		jsx: "automatic",
		external: ["react", "react-dom", "react-highlight", "clipboard-copy"],
	})
	.catch((e) => console.error(e.message));
