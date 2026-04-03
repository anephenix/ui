import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	sassOptions: {
		includePaths: [
			path.resolve("node_modules"),
			path.resolve("src/components"),
			path.resolve("design-system"),
			path.join(__dirname, "styles"),
		],
	},
};
