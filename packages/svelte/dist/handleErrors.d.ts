export declare const handleErrors: (setError: (errors: {
    name: string;
    message: string;
}[]) => void, err: {
    response?: {
        data?: {
            errors?: Record<string, {
                message: string;
            }[]>;
        };
    };
}) => void;
