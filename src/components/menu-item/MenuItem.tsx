interface MenuItemProps {
	text?: string;
	id?: string;
	className?: string;
	url?: string;
	target?: string;
	rel?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	isMobile?: boolean;
	toggleMenu?: () => void;
	Link?: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
	i?: number;
}

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
}: MenuItemProps) => {
	if (url && !onClick) {
		if (url.startsWith("http") || url.startsWith("mailto")) {
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
