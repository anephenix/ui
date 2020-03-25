import Button from './src/components/button/Button';
import Input from './src/components/input/Input';
import Checkbox from './src/components/checkbox/Checkbox';
import RadioButton from './src/components/radio-button/RadioButton';
import Dropdown from './src/components/dropdown/Dropdown';
import FormField from './src/components/form-field/FormField';
import Theme from './src/components/theme/Theme';

const handleErrors = (setError, err) => {
	const errors = [];
	if (err.response?.data?.errors) {
		// eslint-disable-next-line no-unused-vars
		for (const key in err.response.data.errors) {
			// eslint-disable-next-line no-unused-vars
			for (const error of err.response.data.errors[key]) {
				errors.push({
					name: key,
					message: error.message
				});
			}
		}
	} // At the moment this sets just one error for the key, so we will
	setError(errors);
};

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
	applyWebpackConfig,
	handleErrors
};
