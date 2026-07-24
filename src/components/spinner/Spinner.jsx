import "./Spinner.css";

const Spinner = ({ size = "md", label = "Loading...", className }) => {
	const classNames = `spinner spinner-${size}${className ? ` ${className}` : ""}`;
	return <div className={classNames} role="status" aria-label={label} />;
};

export default Spinner;
