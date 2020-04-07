import Link from 'next/link';
import React from 'react';

const MenuItem = ({
	text,
	url,
	target,
	rel,
	onClick,
	isMobile,
	toggleMenu,
	i,
}) => {
	if (url && !onClick) {
		return (
			<li key={i} onClick={isMobile ? toggleMenu : null}>
				<Link href={url}>
					<a target={target} rel={rel}>
						{text}
					</a>
				</Link>
			</li>
		);
	} else {
		return (
			<li key={i}>
				<a onClick={onClick}>{text}</a>
			</li>
		);
	}
};

export default MenuItem;
