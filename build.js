const esbuild = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');

esbuild.build({
	entryPoints: ['index.jsx'],
	bundle: true,
	outfile: 'dist/index.js',
	plugins: [sassPlugin()],
	platform: 'node',
}).catch((e) => console.error(e.message));