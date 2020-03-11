import React, { forwardRef } from 'react';

const RadioButton = forwardRef(function radioButton({
	name,
	label,
	className,
	ref
}) {
	const classNames = `radio ${className}`;
	return (
		<label className={classNames}>
			<input type="radio" name={name} ref={ref} />
			<div className="radio-element">
				<div className="selected"></div>
			</div>
			<span>{label}</span>
		</label>
	);
});

export default RadioButton;
