import { useState } from "react";
import "./Avatar.css";

const COLOURS = [
	"#fd5548",
	"#fd9448",
	"#ffc61a",
	"#69b65c",
	"#279ae1",
	"#7bccff",
	"#95e388",
];

const getInitials = (name) =>
	name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join("");

const getColour = (name) => {
	let hash = 0;
	for (const char of name) {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	}
	return COLOURS[Math.abs(hash) % COLOURS.length];
};

const PersonIcon = () => (
	<svg
		className="avatar-icon"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
	>
		<path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.338 0-10 1.676-10 5v1h20v-1c0-3.324-6.662-5-10-5z" />
	</svg>
);

const Avatar = ({
	src,
	alt,
	name,
	size = "md",
	shape = "circle",
	className,
}) => {
	const [imgError, setImgError] = useState(false);

	const classNames = `avatar avatar-${size} avatar-${shape}${className ? ` ${className}` : ""}`;

	if (src && !imgError) {
		return (
			<div className={classNames}>
				<img
					src={src}
					alt={alt ?? name ?? "Avatar"}
					className="avatar-img"
					onError={() => setImgError(true)}
				/>
			</div>
		);
	}

	if (name) {
		const initials = getInitials(name);
		const bgColour = getColour(name);
		return (
			<div
				role="img"
				className={classNames}
				style={{ backgroundColor: bgColour }}
				aria-label={name}
				title={name}
			>
				<span className="avatar-initials" aria-hidden="true">
					{initials}
				</span>
			</div>
		);
	}

	return (
		<div
			role="img"
			className={classNames}
			aria-label={alt ?? "User avatar"}
			title={alt ?? "User avatar"}
		>
			<PersonIcon />
		</div>
	);
};

export default Avatar;
