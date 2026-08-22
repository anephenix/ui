export const handleErrors = (setError, err) => {
    const errors = [];
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
