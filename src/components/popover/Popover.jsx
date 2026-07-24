import { cloneElement, useEffect, useRef, useState } from "react";
import "./Popover.css";

const Popover = ({
	trigger,
	content,
	title,
	position = "bottom",
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		if (!isOpen) return;
		const handleOutsideClick = (e) => {
			if (!containerRef.current?.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => document.removeEventListener("mousedown", handleOutsideClick);
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen]);

	const triggerEl = cloneElement(trigger, {
		onClick: (e) => {
			trigger.props.onClick?.(e);
			setIsOpen((prev) => !prev);
		},
		"aria-expanded": isOpen,
		"aria-haspopup": "dialog",
	});

	const popoverClass = `popover popover-${position}${className ? ` ${className}` : ""}`;

	return (
		<div ref={containerRef} className="popover-wrapper">
			{triggerEl}
			{isOpen && (
				<dialog
					open
					className={popoverClass}
					aria-label={title ?? "Popover"}
					aria-modal="false"
				>
					<div className="popover-header">
						{title && <div className="popover-title">{title}</div>}
						<button
							type="button"
							className="popover-close"
							onClick={() => setIsOpen(false)}
							aria-label="Close"
						>
							&times;
						</button>
					</div>
					<div className="popover-body">{content}</div>
				</dialog>
			)}
		</div>
	);
};

export default Popover;
