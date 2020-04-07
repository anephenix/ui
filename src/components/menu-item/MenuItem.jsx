import Link from 'next/link';
import React from 'react';

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
	i,
}) => {
	if (url && !onClick) {
		if (url.match('http') !== -1) {
			return (
				<li key={i} onClick={isMobile ? toggleMenu : null}>
					<a
						id={id}
						href={url}
						className={className}
						target={target}
						rel={rel}
					>
						{text}
					</a>
				</li>
			);
		} else {
			return (
				<li key={i} onClick={isMobile ? toggleMenu : null}>
					<Link href={url}>
						<a
							id={id}
							className={className}
							target={target}
							rel={rel}
						>
							{text}
						</a>
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
