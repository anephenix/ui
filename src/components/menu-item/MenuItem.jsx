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
				<li key={i}>
					<a
						id={id}
						href={url}
						className={className}
						target={target}
						rel={rel}
						onClick={isMobile ? toggleMenu : undefined}
					>
						{text}
					</a>
				</li>
			);
		} else {
			return (
				<li key={i}>
					<Link
						id={id}
						href={url}
						className={className}
						target={target}
						rel={rel}
						onClick={isMobile ? toggleMenu : undefined}
					>
						{text}
					</Link>
				</li>
			);
		}
	} else {
		return (
			<li key={i}>
				<button type="button" id={id} className={className} onClick={onClick}>
					{text}
				</button>
			</li>
		);
	}
};

export default MenuItem;
