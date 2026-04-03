// RCG is used to aid in creating React components from the CLI fast

import path from "node:path";

const config = {
	directory: path.join(process.cwd(), "src", "components"),
	jsExtension: "jsx",
	cssExtension: "scss",
};

export default config;
