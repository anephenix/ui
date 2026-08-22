import { forwardRef } from "react";

interface CheckboxProps {
	label?: string;
	className?: string;
	name?: string;
	defaultValue?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function checkbox(
	{ label, className, name, defaultValue },
	ref,
) {
	const classNames = `checkbox ${className}`;
	return (
		<label className={classNames}>
			<input
				type="checkbox"
				name={name}
				ref={ref}
				defaultChecked={defaultValue}
			/>
			<div className="checkbox-element">
				<div className="tick"></div>
			</div>
			<span>{label}</span>
		</label>
	);
});

export default Checkbox;
