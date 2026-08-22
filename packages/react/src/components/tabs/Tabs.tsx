import { useRef, useState } from "react";
import "@anephenix/ui-tokens/components/tabs/Tabs.css";

interface Tab {
	id: string;
	label: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	defaultTab?: string;
	onChange?: (id: string) => void;
	className?: string;
}

const Tabs = ({ tabs, defaultTab, onChange, className }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);
	const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

	const handleSelect = (id: string) => {
		setActiveTab(id);
		onChange?.(id);
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLButtonElement>,
		index: number,
	) => {
		let nextIndex: number | null = null;
		if (e.key === "ArrowRight") {
			nextIndex = (index + 1) % tabs.length;
		} else if (e.key === "ArrowLeft") {
			nextIndex = (index - 1 + tabs.length) % tabs.length;
		}
		if (nextIndex !== null) {
			e.preventDefault();
			const nextId = tabs[nextIndex].id;
			handleSelect(nextId);
			tabRefs.current[nextId]?.focus();
		}
	};

	const wrapperClass = `tabs${className ? ` ${className}` : ""}`;

	return (
		<div className={wrapperClass}>
			<div role="tablist" className="tabs-list">
				{tabs.map(({ id, label }, index) => (
					<button
						key={id}
						ref={(el) => {
							tabRefs.current[id] = el;
						}}
						id={`tab-${id}`}
						type="button"
						role="tab"
						aria-selected={activeTab === id}
						aria-controls={`panel-${id}`}
						className={`tabs-tab${activeTab === id ? " tabs-tab-active" : ""}`}
						tabIndex={activeTab === id ? 0 : -1}
						onClick={() => handleSelect(id)}
						onKeyDown={(e) => handleKeyDown(e, index)}
					>
						{label}
					</button>
				))}
			</div>
			{tabs.map(({ id, content }) => (
				<div
					key={id}
					id={`panel-${id}`}
					role="tabpanel"
					aria-labelledby={`tab-${id}`}
					className="tabs-panel"
					hidden={activeTab !== id}
				>
					{content}
				</div>
			))}
		</div>
	);
};

export default Tabs;
