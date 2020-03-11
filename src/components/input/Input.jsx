import React, { forwardRef } from 'react';

const Input = forwardRef(function input(
	{ type = 'text', className, value, placeholder, name },
	ref
) {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			className={className}
			value={value}
			placeholder={placeholder}
		/>
	);
});

export default Input;
