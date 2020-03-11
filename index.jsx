import Button from './src/components/button/Button';
import Input from './src/components/input/Input';
import Checkbox from './src/components/checkbox/Checkbox';
import RadioButton from './src/components/radio-button/RadioButton';
import Dropdown from './src/components/dropdown/Dropdown';
import FormField from './src/components/form-field/FormField';
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

export {
	Button,
	Input,
	Checkbox,
	RadioButton,
	Theme,
	Dropdown,
	FormField,
	applyWebpackConfig
};
