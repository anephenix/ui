import { forwardRef, useState } from "react";
import "./Switch.css";

interface SwitchProps {
	name?: string;
	label?: string;
	className?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	disabled?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(function switchInput(
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
