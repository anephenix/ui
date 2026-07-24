import "./Skeleton.css";

const toCSS = (value) => (typeof value === "number" ? `${value}px` : value);

const SkeletonLine = ({ width, height, borderRadius }) => (
	<div
		className="skeleton"
		style={{ width: toCSS(width), height: toCSS(height), borderRadius }}
		aria-hidden="true"
	/>
);

const Skeleton = ({
	width = "100%",
	height = "1rem",
	borderRadius = "4px",
	lines = 1,
	className,
}) => {
	if (lines === 1) {
		return (
			<div
				className={`skeleton${className ? ` ${className}` : ""}`}
				style={{ width: toCSS(width), height: toCSS(height), borderRadius }}
				aria-hidden="true"
			/>
		);
	}

	const lineItems = Array.from({ length: lines }, (_, i) => ({
		id: `line-${i}`,
		isLast: i === lines - 1,
	}));

	return (
		<div className={`skeleton-group${className ? ` ${className}` : ""}`}>
			{lineItems.map(({ id, isLast }) => (
				<SkeletonLine
					key={id}
					width={isLast ? "70%" : width}
					height={height}
					borderRadius={borderRadius}
				/>
			))}
		</div>
	);
};

export default Skeleton;
