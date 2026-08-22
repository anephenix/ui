import { forwardRef } from "react";
import "@anephenix/ui-tokens/components/select/Select.css";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	className?: string;
	defaultValue?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	options: SelectOption[];
}

const Option = ({ value, label }: SelectOption, index: number) => (
	<option key={index} value={value}>
		{label}
	</option>
);

const Select = forwardRef<HTMLSelectElement, SelectProps>(function select(
	{ className, defaultValue, name, onChange, options },
	ref,
) {
	return (
		<select
			ref={ref}
			name={name}
			className={`select ${className}`}
			defaultValue={defaultValue}
			onChange={onChange}
		>
			{options.map(Option)}
		</select>
	);
});

export default Select;
