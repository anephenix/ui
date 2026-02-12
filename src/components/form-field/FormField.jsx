import React from "react";
import "./FormField.scss";

const ErrorMessage = ({ error }) => (
	<div className="error-message">{error}</div>
);

const FormField = ({ children, error }) => {
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
