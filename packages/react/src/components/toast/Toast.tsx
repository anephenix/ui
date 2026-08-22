import { useEffect } from "react";
import "@anephenix/ui-tokens/components/toast/Toast.css";

type ToastVariant = "info" | "success" | "error" | "warning";

const variantIcons: Record<ToastVariant, string> = {
	success: "✓",
	error: "✕",
	warning: "⚠",
	info: "ℹ",
};

interface ToastProps {
	isVisible: boolean;
	title?: string;
	message?: string;
	variant?: ToastVariant;
	position?: string;
	onClose?: () => void;
	duration?: number;
}

const Toast = ({
	isVisible,
	title,
	message,
	variant = "info",
	position = "top-right",
	onClose,
	duration = 4000,
}: ToastProps) => {
	useEffect(() => {
		if (!isVisible || !duration) return;
		const timer = setTimeout(() => onClose?.(), duration);
		return () => clearTimeout(timer);
	}, [isVisible, duration, onClose]);

	if (!isVisible) return null;

	return (
		<div
			className={`toast toast-${variant} toast-${position}`}
			role="alert"
			aria-live="polite"
		>
			<div className="toast-icon">{variantIcons[variant]}</div>
			<div className="toast-content">
				{title && <div className="toast-title">{title}</div>}
				<div className="toast-message">{message}</div>
			</div>
			<button
				type="button"
				className="toast-close"
				onClick={onClose}
				aria-label="Close"
			>
				&times;
			</button>
		</div>
	);
};

export default Toast;
