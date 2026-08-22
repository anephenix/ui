export const handleErrors = (
	setError: (errors: { name: string; message: string }[]) => void,
	err: {
		response?: { data?: { errors?: Record<string, { message: string }[]> } };
	},
) => {
	const errors: { name: string; message: string }[] = [];
	if (err?.response?.data?.errors) {
		for (const key in err.response.data.errors) {
			for (const error of err.response.data.errors[key]) {
				errors.push({
					name: key,
					message: error.message,
				});
			}
		}
	}
	setError(errors);
};
