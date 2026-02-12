import React, { forwardRef } from "react";

const Input = forwardRef(function input(
	{ type = "text", className, defaultValue, placeholder, name, onChange },
	ref,
) {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			className={className}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
});

export default Input;
