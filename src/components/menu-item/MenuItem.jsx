import React from "react";

const MenuItem = ({
	text,
	id,
	className,
	url,
	target,
	rel,
	onClick,
	isMobile,
	toggleMenu,
	Link,
	i,
}) => {
	if (url && !onClick) {
		if (url.startsWith("http") || url.startsWith("mailto")) {
			// Need to check if this is external domain (i.e. github)
			return (
				<li key={i} onClick={isMobile ? toggleMenu : null}>
					<a id={id} href={url} className={className} target={target} rel={rel}>
						{text}
					</a>
				</li>
			);
		} else {
			return (
				<li key={i} onClick={isMobile ? toggleMenu : null}>
					<Link
						id={id}
						href={url}
						className={className}
						target={target}
						rel={rel}
					>
						{text}
					</Link>
				</li>
			);
		}
	} else {
		return (
			<li key={i}>
				<a id={id} className={className} onClick={onClick}>
					{text}
				</a>
			</li>
		);
	}
};

export default MenuItem;
