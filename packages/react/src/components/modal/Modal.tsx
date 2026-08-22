import { useEffect, useRef } from "react";
import "@anephenix/ui-tokens/components/modal/Modal.css";

interface ModalProps {
	isOpen: boolean;
	onClose?: () => void;
	title?: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) {
			if (!dialog.open) dialog.showModal();
		} else {
			if (dialog.open) dialog.close();
		}
	}, [isOpen]);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		const handleCancel = () => onClose?.();
		dialog.addEventListener("cancel", handleCancel);
		return () => dialog.removeEventListener("cancel", handleCancel);
	}, [onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) onClose?.();
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <dialog> handles keyboard interaction natively via the cancel event (Escape key)
		<dialog ref={dialogRef} className="modal" onClick={handleBackdropClick}>
			<div className="modal-content">
				<div className="modal-header">
					<h2 className="modal-title">{title}</h2>
					<button
						type="button"
						className="modal-close"
						onClick={onClose}
						aria-label="Close"
					>
						&times;
					</button>
				</div>
				<div className="modal-body">{children}</div>
				{footer && <div className="modal-footer">{footer}</div>}
			</div>
		</dialog>
	);
};

export default Modal;
