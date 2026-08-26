import Accordion from "./src/components/accordion/Accordion";
import Alert from "./src/components/alert/Alert";
import Avatar from "./src/components/avatar/Avatar";
import Badge from "./src/components/badge/Badge";
import Breadcrumb from "./src/components/breadcrumb/Breadcrumb";
import Button from "./src/components/button/Button";
import Card from "./src/components/card/Card";
import Checkbox from "./src/components/checkbox/Checkbox";
import Code from "./src/components/code/Code";
import CodeEditor from "./src/components/code-editor/CodeEditor";
import ComboBox from "./src/components/combo-box/ComboBox";
import Divider from "./src/components/divider/Divider";
import Dropdown from "./src/components/dropdown/Dropdown";
import Footer from "./src/components/footer/Footer";
import FormField from "./src/components/form-field/FormField";
import Hero from "./src/components/hero/Hero";
import Input from "./src/components/input/Input";
import LiveTerminal from "./src/components/live-terminal/LiveTerminal";
import Modal from "./src/components/modal/Modal";
import NavBar from "./src/components/nav-bar/NavBar";
import Page from "./src/components/page/Page";
import Pagination from "./src/components/pagination/Pagination";
import Popover from "./src/components/popover/Popover";
import ProgressBar from "./src/components/progress-bar/ProgressBar";
import RadioButton from "./src/components/radio-button/RadioButton";
import Select from "./src/components/select/Select";
import Skeleton from "./src/components/skeleton/Skeleton";
import Spinner from "./src/components/spinner/Spinner";
import Switch from "./src/components/switch/Switch";
import Table from "./src/components/table/Table";
import Tabs from "./src/components/tabs/Tabs";
import Terminal from "./src/components/terminal/Terminal";
import Textarea from "./src/components/textarea/Textarea";
import Toast from "./src/components/toast/Toast";
import Tooltip from "./src/components/tooltip/Tooltip";

import "@anephenix/ui-tokens/design-system/index.css";

const handleErrors = (
	setError: (errors: { name: string; message: string }[]) => void,
	err: {
		response?: { data?: { errors?: Record<string, { message: string }[]> } };
	},
) => {
	const errors: { name: string; message: string }[] = [];
	if (err?.response?.data?.errors) {
		for (const key in err.response.data.errors) {
			for (const error of err.response.data.errors[key]) {
				errors.push({
					name: key,
					message: error.message,
				});
			}
		}
	}
	setError(errors);
};

export {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Code,
	CodeEditor,
	ComboBox,
	Divider,
	Dropdown,
	Footer,
	FormField,
	Hero,
	handleErrors,
	Input,
	LiveTerminal,
	Modal,
	NavBar,
	Page,
	Pagination,
	Popover,
	ProgressBar,
	RadioButton,
	Select,
	Skeleton,
	Spinner,
	Switch,
	Table,
	Tabs,
	Terminal,
	Textarea,
	Toast,
	Tooltip,
};
