import { forwardRef, useState } from "react";
import "./Switch.css";

const Switch = forwardRef(function switchInput(
	{
		name,
		label,
		className,
		checked,
		defaultChecked = false,
		onChange,
		disabled,
	},
	ref,
) {
	const isControlled = checked !== undefined;
	const [internalChecked, setInternalChecked] = useState(defaultChecked);
	const isChecked = isControlled ? checked : internalChecked;

	const handleChange = (e) => {
		if (!isControlled) {
			setInternalChecked(e.target.checked);
		}
		onChange?.(e);
	};

	const labelClass = `switch${disabled ? " switch-disabled" : ""}${className ? ` ${className}` : ""}`;

	return (
		<label className={labelClass}>
			<input
				type="checkbox"
				role="switch"
				aria-checked={isChecked}
				name={name}
				ref={ref}
				checked={isChecked}
				onChange={handleChange}
				disabled={disabled}
			/>
			<div className="switch-track">
				<div className="switch-thumb" />
			</div>
			{label && <span className="switch-label">{label}</span>}
		</label>
	);
});

export default Switch;
