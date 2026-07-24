import "./Badge.css";

const Badge = ({ children, variant = "default", size = "md", className }) => {
	const classNames = `badge badge-${variant} badge-${size}${className ? ` ${className}` : ""}`;
	return <span className={classNames}>{children}</span>;
};

export default Badge;
