import "./Tooltip.css";

interface TooltipProps {
	children: React.ReactNode;
	content: React.ReactNode;
	position?: string;
	className?: string;
}

const Tooltip = ({
	children,
	content,
	position = "top",
	className,
}: TooltipProps) => {
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
