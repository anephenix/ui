import React from 'react';

const Input = ({ type = 'text', className, value, placeholder, name, ref }) => (
	<input
		ref={ref}
		name={name}
		type={type}
		className={className}
		value={value}
		placeholder={placeholder}
	/>
);

export default Input;
