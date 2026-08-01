import "./Spinner.css";

interface SpinnerProps {
	size?: string;
	label?: string;
	className?: string;
}

const Spinner = ({
	size = "md",
	label = "Loading...",
	className,
}: SpinnerProps) => {
	const classNames = `spinner spinner-${size}${className ? ` ${className}` : ""}`;
	return <div className={classNames} role="status" aria-label={label} />;
};

export default Spinner;
