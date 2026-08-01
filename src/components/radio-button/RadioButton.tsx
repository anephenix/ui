import { forwardRef } from "react";

interface RadioButtonProps {
	name?: string;
	label?: string;
	className?: string;
	defaultValue?: string;
	value?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	checked?: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
	function radioButton(
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
	},
);

export default RadioButton;
