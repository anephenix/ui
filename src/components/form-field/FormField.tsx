import "./FormField.css";

interface ErrorMessageProps {
	error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => (
	<div className="error-message">{error}</div>
);

interface FormFieldProps {
	children: React.ReactNode;
	error?: string;
}

const FormField = ({ children, error }: FormFieldProps) => {
	const errorClass = error ? "error" : null;
	const errorMessage = error ? <ErrorMessage error={error} /> : null;
	const classNames = `form-field ${errorClass}`;
	return (
		<div className={classNames}>
			{children}
			{errorMessage}
		</div>
	);
};

export default FormField;
