import "./Tooltip.css";

const Tooltip = ({ children, content, position = "top", className }) => {
	const tooltipClass = `tooltip tooltip-${position}${className ? ` ${className}` : ""}`;

	return (
		<span className="tooltip-wrapper">
			{children}
			<span role="tooltip" className={tooltipClass}>
				{content}
			</span>
		</span>
	);
};

export default Tooltip;
