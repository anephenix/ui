import { forwardRef } from "react";

interface TextareaProps {
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	name?: string;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	function textarea(
		{ className, defaultValue, placeholder, name, onChange },
		ref,
	) {
		return (
			<textarea
				ref={ref}
				name={name}
				className={className}
				defaultValue={defaultValue}
				onChange={onChange}
				placeholder={placeholder}
			/>
		);
	},
);

export default Textarea;
