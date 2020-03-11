import React, { forwardRef } from 'react';

const Button = forwardRef(function button({ className, text, name }, ref) {
	return (
		<button name={name} ref={ref} className={className}>
			{text}
		</button>
	);
});

export default Button;
