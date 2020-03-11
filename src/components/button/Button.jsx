import React from 'react';

const Button = ({ className, text, name, ref }) => (
	<button name={name} ref={ref} className={className}>
		{text}
	</button>
);

export default Button;
