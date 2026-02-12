import React, { forwardRef } from "react";

const Button = forwardRef(function button(
	{ className, text, name, onClick },
	ref,
) {
	return (
		<button name={name} ref={ref} className={className} onClick={onClick}>
			{text}
		</button>
	);
});

export default Button;
