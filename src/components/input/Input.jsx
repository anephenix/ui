import React, { forwardRef } from 'react';

const Input = forwardRef(function input(
	{ type = 'text', className, value, placeholder, name, onChange },
	ref
) {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			className={className}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
});

export default Input;
