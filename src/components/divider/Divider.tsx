import "./Divider.css";

interface DividerProps {
	orientation?: "horizontal" | "vertical";
	variant?: string;
	label?: string;
	className?: string;
}

const Divider = ({
	orientation = "horizontal",
	variant = "solid",
	label,
	className = "",
}: DividerProps) => {
	const classNames = `divider divider-${orientation} divider-${variant}${className ? ` ${className}` : ""}`;

	if (orientation === "horizontal" && !label) {
		return <hr className={classNames} />;
	}

	return (
		<div aria-hidden="true" className={classNames}>
			{label && <span className="divider-label">{label}</span>}
		</div>
	);
};

export default Divider;
