import { useState } from "react";
import "@anephenix/ui-tokens/components/accordion/Accordion.css";

interface AccordionItem {
	id: string;
	title: React.ReactNode;
	content: React.ReactNode;
}

interface AccordionProps {
	items: AccordionItem[];
	allowMultiple?: boolean;
	defaultOpen?: string | string[];
	onChange?: (openIds: string[]) => void;
	className?: string;
}

const Accordion = ({
	items,
	allowMultiple = false,
	defaultOpen,
	onChange,
	className,
}: AccordionProps) => {
	const initialOpen = defaultOpen
		? new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen])
		: new Set<string>();

	const [openItems, setOpenItems] = useState(initialOpen);

	const toggle = (id: string) => {
		const next = new Set(openItems);
		if (next.has(id)) {
			next.delete(id);
		} else {
			if (!allowMultiple) next.clear();
			next.add(id);
		}
		setOpenItems(next);
		onChange?.([...next]);
	};

	const wrapperClass = `accordion${className ? ` ${className}` : ""}`;

	return (
		<div className={wrapperClass}>
			{items.map(({ id, title, content }) => {
				const isOpen = openItems.has(id);
				return (
					<div key={id} className="accordion-item">
						<h3 className="accordion-heading">
							<button
								type="button"
								id={`trigger-${id}`}
								aria-expanded={isOpen}
								aria-controls={`panel-${id}`}
								className={`accordion-trigger${isOpen ? " accordion-trigger-open" : ""}`}
								onClick={() => toggle(id)}
							>
								<span className="accordion-title">{title}</span>
								<span
									className={`accordion-chevron${isOpen ? " accordion-chevron-open" : ""}`}
									aria-hidden="true"
								/>
							</button>
						</h3>
						<section
							id={`panel-${id}`}
							aria-labelledby={`trigger-${id}`}
							className={`accordion-panel${isOpen ? " accordion-panel-open" : ""}`}
						>
							<div className="accordion-panel-inner">{content}</div>
						</section>
					</div>
				);
			})}
		</div>
	);
};

export default Accordion;
