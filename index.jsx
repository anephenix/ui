import Button from './src/components/button/Button';
import Input from './src/components/input/Input';
import Select from './src/components/select/Select';
import Checkbox from './src/components/checkbox/Checkbox';
import RadioButton from './src/components/radio-button/RadioButton';
import Dropdown from './src/components/dropdown/Dropdown';
import FormField from './src/components/form-field/FormField';
import NavBar from './src/components/nav-bar/NavBar';
import Terminal from './src/components/terminal/Terminal';
import Code from './src/components/code/Code';
import Page from './src/components/page/Page';
import Hero from './src/components/hero/Hero';
import Textarea from './src/components/textarea/Textarea';
import Footer from './src/components/footer/Footer';

import './design-system/index.scss';

const handleErrors = (setError, err) => {
	const errors = [];
	if (err && err.response && err.response.data && err.response.data.errors) {
		// eslint-disable-next-line no-unused-vars
		for (const key in err.response.data.errors) {
			// eslint-disable-next-line no-unused-vars
			for (const error of err.response.data.errors[key]) {
				errors.push({
					name: key,
					message: error.message,
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
			use: [options.defaultLoaders.babel],
		});
		return config;
	};
};

export {
	Button,
	Input,
	Select,
	Checkbox,
	RadioButton,
	Dropdown,
	FormField,
	NavBar,
	Terminal,
	Code,
	Page,
	Hero,
	Footer,
	Textarea,
	applyWebpackConfig,
	handleErrors,
};
