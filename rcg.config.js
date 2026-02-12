// RCG is used to aid in creating React components from the CLI fast

const path = require("path");

const config = {
	directory: path.join(process.cwd(), "src", "components"),
	jsExtension: "jsx",
	cssExtension: "scss",
};

module.exports = config;
