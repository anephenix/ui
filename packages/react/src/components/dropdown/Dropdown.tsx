import { forwardRef } from "react";

interface DropdownOption {
	value: string;
	text: string;
}

interface DropdownProps {
	options: DropdownOption[];
	multiple?: boolean;
	id?: string;
	className?: string;
	name?: string;
	defaultValue?: string | string[];
}

const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function dropdown(
	{ options, multiple, id, className, name, defaultValue },
	ref,
) {
	const classNames = `dropdown ${className}`;
	return (
		<div className={classNames}>
			<select
				name={name}
				multiple={multiple}
				id={id}
				ref={ref}
				defaultValue={defaultValue}
			>
				{options.map(({ value, text }) => (
					<option key={value} value={value}>
						{text}
					</option>
				))}
			</select>
		</div>
	);
});

export default Dropdown;
