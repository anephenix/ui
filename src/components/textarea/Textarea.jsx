import React, { forwardRef } from "react";

const Textarea = forwardRef(function textarea(
	{ className, defaultValue, placeholder, name, onChange },
	ref,
) {
	return (
		<textarea
			ref={ref}
			name={name}
			className={className}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
});

export default Textarea;
