import "./Alert.css";

const variantIcons = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ",
};

const Alert = ({ variant = "info", title, children, onClose, className }) => {
	const role =
		variant === "error" || variant === "warning" ? "alert" : "status";
	const classNames = `alert alert-${variant}${className ? ` ${className}` : ""}`;

	return (
		<div className={classNames} role={role}>
			<div className="alert-icon">{variantIcons[variant]}</div>
			<div className="alert-content">
				{title && <div className="alert-title">{title}</div>}
				<div className="alert-body">{children}</div>
			</div>
			{onClose && (
				<button
					type="button"
					className="alert-close"
					onClick={onClose}
					aria-label="Dismiss"
				>
					&times;
				</button>
			)}
		</div>
	);
};

export default Alert;
