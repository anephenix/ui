import { forwardRef } from "react";

const RadioButton = forwardRef(function radioButton(
	{ name, label, className, defaultValue, value, onChange, checked },
	ref,
) {
	const classNames = `radio ${className}`;
	const isControlled = checked !== undefined;
	return (
		<label className={classNames}>
			<input
				type="radio"
				name={name}
				ref={ref}
				value={isControlled ? value : defaultValue}
				{...(isControlled ? { checked, onChange } : {})}
			/>
			<div className="radio-element">
				<div className="selected"></div>
			</div>
			<span>{label}</span>
		</label>
	);
});

export default RadioButton;
