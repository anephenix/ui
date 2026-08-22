import { useEffect, useId, useRef, useState } from "react";
import "@anephenix/ui-tokens/components/combo-box/ComboBox.css";

interface ComboBoxOption {
	label: string;
	value: string;
}

interface ComboBoxProps {
	options?: ComboBoxOption[];
	value?: string;
	onChange?: (value: string) => void;
	onSelect?: (option: ComboBoxOption) => void;
	placeholder?: string;
	disabled?: boolean;
}

const ComboBox = ({
	options = [],
	value,
	onChange,
	onSelect,
	placeholder = "Search...",
	disabled = false,
}: ComboBoxProps) => {
	const [inputValue, setInputValue] = useState(value ?? "");
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const listboxId = useId();

	const filtered = options.filter((opt) =>
		opt.label.toLowerCase().includes(inputValue.toLowerCase()),
	);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
				setActiveIndex(-1);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setInputValue(val);
		setIsOpen(true);
		setActiveIndex(-1);
		onChange?.(val);
	};

	const handleSelect = (option: ComboBoxOption) => {
		setInputValue(option.label);
		setIsOpen(false);
		setActiveIndex(-1);
		onSelect?.(option);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) {
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				setIsOpen(true);
				setActiveIndex(0);
				e.preventDefault();
			}
			return;
		}
		if (e.key === "ArrowDown") {
			setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
			e.preventDefault();
		} else if (e.key === "ArrowUp") {
			setActiveIndex((i) => Math.max(i - 1, 0));
			e.preventDefault();
		} else if (e.key === "Enter" && activeIndex >= 0) {
			handleSelect(filtered[activeIndex]);
			e.preventDefault();
		} else if (e.key === "Escape") {
			setIsOpen(false);
			setActiveIndex(-1);
		}
	};

	return (
		<div className="combo-box" ref={containerRef}>
			<input
				type="text"
				className="combo-box-input"
				value={inputValue}
				onChange={handleInputChange}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				disabled={disabled}
				role="combobox"
				aria-expanded={isOpen}
				aria-autocomplete="list"
				aria-controls={listboxId}
				aria-activedescendant={
					activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
				}
			/>
			{isOpen && (
				<div className="combo-box-listbox" role="listbox" id={listboxId}>
					{filtered.length > 0 ? (
						filtered.map((option, index) => (
							<div
								key={option.value}
								id={`${listboxId}-option-${index}`}
								className={`combo-box-option${activeIndex === index ? " combo-box-option-active" : ""}`}
								role="option"
								tabIndex={-1}
								aria-selected={activeIndex === index}
								onMouseDown={() => handleSelect(option)}
							>
								{option.label}
							</div>
						))
					) : (
						<div className="combo-box-no-results">No results found</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ComboBox;
