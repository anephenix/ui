import React from 'react';

const MenuItem = ({ text, url, target, rel, onClick, forMobile }, i) => {
	if (url) {
		return (
			<li key={i} onClick={forMobile ? onClick : null}>
				<a href={url} target={target} rel={rel}>
					{text}
				</a>
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
