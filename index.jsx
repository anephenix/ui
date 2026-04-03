import Button from "./src/components/button/Button";
import Checkbox from "./src/components/checkbox/Checkbox";
import Code from "./src/components/code/Code";
import Dropdown from "./src/components/dropdown/Dropdown";
import Footer from "./src/components/footer/Footer";
import FormField from "./src/components/form-field/FormField";
import Hero from "./src/components/hero/Hero";
import Input from "./src/components/input/Input";
import NavBar from "./src/components/nav-bar/NavBar";
import Page from "./src/components/page/Page";
import RadioButton from "./src/components/radio-button/RadioButton";
import Select from "./src/components/select/Select";
import Terminal from "./src/components/terminal/Terminal";
import Textarea from "./src/components/textarea/Textarea";

import "./design-system/index.scss";

const handleErrors = (setError, err) => {
	const errors = [];
	if (err?.response?.data?.errors) {
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
	applyWebpackConfig,
	Button,
	Checkbox,
	Code,
	Dropdown,
	Footer,
	FormField,
	Hero,
	handleErrors,
	Input,
	NavBar,
	Page,
	RadioButton,
	Select,
	Terminal,
	Textarea,
};
