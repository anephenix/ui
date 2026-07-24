import { useEffect, useRef } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children, footer }) => {
	const dialogRef = useRef(null);

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

	const handleBackdropClick = (e) => {
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
