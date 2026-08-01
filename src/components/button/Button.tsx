import { forwardRef } from "react";

interface ButtonProps {
	className?: string;
	text?: string;
	name?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function button(
	{ className, text, name, onClick },
	ref,
) {
	return (
		<button
			type="button"
			name={name}
			ref={ref}
			className={className}
			onClick={onClick}
		>
			{text}
		</button>
	);
});

export default Button;
