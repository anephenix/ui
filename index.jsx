import Button from './src/components/button/Button';
import Input from './src/components/input/Input';
import Checkbox from './src/components/checkbox/Checkbox';
import RadioButton from './src/components/radio-button/RadioButton';
import Theme from './src/components/theme/Theme';

const applyWebpackConfig = (test = /\.jsx/) => {
	return (config, options) => {
		config.module.rules.push({
			test,
			use: [options.defaultLoaders.babel]
		});
		return config;
	};
};

export { Button, Input, Checkbox, RadioButton, Theme, applyWebpackConfig };
