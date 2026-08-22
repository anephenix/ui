import "@anephenix/ui-tokens/components/breadcrumb/Breadcrumb.css";

interface BreadcrumbItem {
	href?: string;
	label: string;
}

interface BreadcrumbProps {
	items: BreadcrumbItem[];
	separator?: string;
	className?: string;
}

const Breadcrumb = ({ items, separator = "/", className }: BreadcrumbProps) => {
	const classNames = `breadcrumb${className ? ` ${className}` : ""}`;

	return (
		<nav aria-label="Breadcrumb">
			<ol className={classNames}>
				{items.map((item, index) => (
					<li key={item.href ?? item.label} className="breadcrumb-item">
						{index > 0 && (
							<span className="breadcrumb-separator" aria-hidden="true">
								{separator}
							</span>
						)}
						{item.href ? (
							<a href={item.href} className="breadcrumb-link">
								{item.label}
							</a>
						) : (
							<span className="breadcrumb-current" aria-current="page">
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
