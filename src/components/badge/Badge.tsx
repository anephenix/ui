import "@anephenix/ui-tokens/components/badge/Badge.css";

interface BadgeProps {
	children: React.ReactNode;
	variant?: string;
	size?: string;
	className?: string;
}

const Badge = ({
	children,
	variant = "default",
	size = "md",
	className,
}: BadgeProps) => {
	const classNames = `badge badge-${variant} badge-${size}${className ? ` ${className}` : ""}`;
	return <span className={classNames}>{children}</span>;
};

export default Badge;
