// babel.config.js
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
				},
			},
		],
		'@babel/preset-react',
	],
	plugins: [['@babel/plugin-proposal-optional-chaining', { loose: false }]],
};
