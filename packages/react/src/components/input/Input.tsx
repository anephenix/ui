import { forwardRef } from "react";

interface InputProps {
	type?: string;
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function input(
	{ type = "text", className, defaultValue, placeholder, name, onChange },
	ref,
) {
	return (
		<input
			ref={ref}
			name={name}
			type={type}
			className={className}
			defaultValue={defaultValue}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
});

export default Input;
