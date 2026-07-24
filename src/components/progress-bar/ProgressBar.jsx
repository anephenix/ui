import "./ProgressBar.css";

const ProgressBar = ({
	value = 0,
	max = 100,
	variant = "default",
	size = "md",
	label,
	showValue = false,
	indeterminate = false,
	className = "",
}) => {
	const percentage = indeterminate
		? null
		: Math.min(100, Math.max(0, (value / max) * 100));

	return (
		<div className={`progress-bar-wrapper${className ? ` ${className}` : ""}`}>
			{(label || (showValue && !indeterminate)) && (
				<div className="progress-bar-header">
					{label && <span className="progress-bar-label">{label}</span>}
					{showValue && !indeterminate && (
						<span className="progress-bar-value">
							{Math.round(percentage)}%
						</span>
					)}
				</div>
			)}
			<div
				className={`progress-bar progress-bar-${size}`}
				role="progressbar"
				aria-valuenow={indeterminate ? undefined : value}
				aria-valuemin={0}
				aria-valuemax={max}
				aria-label={label ?? "Progress"}
			>
				<div
					className={`progress-bar-fill progress-bar-${variant}${indeterminate ? " progress-bar-indeterminate" : ""}`}
					style={indeterminate ? undefined : { width: `${percentage}%` }}
				/>
			</div>
		</div>
	);
};

export default ProgressBar;
