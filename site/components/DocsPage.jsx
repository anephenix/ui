import { Card, Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const categories = [
	{
		label: "Layout",
		items: [
			{
				href: "/docs/components/page",
				name: "Page",
				desc: "Full-page wrapper div",
			},
			{
				href: "/docs/components/hero",
				name: "Hero",
				desc: "Hero section with heading, description, and call-to-action buttons",
			},
			{
				href: "/docs/components/footer",
				name: "Footer",
				desc: "Two-column page footer",
			},
		],
	},
	{
		label: "Navigation",
		items: [
			{
				href: "/docs/components/breadcrumb",
				name: "Breadcrumb",
				desc: "Navigation trail showing location within a hierarchy",
			},
			{
				href: "/docs/components/nav-bar",
				name: "NavBar",
				desc: "Responsive nav bar with desktop and mobile menus",
			},
			{
				href: "/docs/components/pagination",
				name: "Pagination",
				desc: "Page-number controls with first, previous, next, and last buttons",
			},
		],
	},
	{
		label: "Forms",
		items: [
			{
				href: "/docs/components/button",
				name: "Button",
				desc: "Button element with seven colour variants",
			},
			{
				href: "/docs/components/checkbox",
				name: "Checkbox",
				desc: "Styled checkbox with a label",
			},
			{
				href: "/docs/components/switch",
				name: "Switch",
				desc: "Toggle switch for binary on/off settings",
			},
			{
				href: "/docs/components/input",
				name: "Input",
				desc: "Text input element",
			},
			{
				href: "/docs/components/radio-button",
				name: "RadioButton",
				desc: "Styled radio button with a label",
			},
			{
				href: "/docs/components/select",
				name: "Select",
				desc: "Styled select element",
			},
			{
				href: "/docs/components/dropdown",
				name: "Dropdown",
				desc: "Styled dropdown with optional multiple selection",
			},
			{
				href: "/docs/components/combo-box",
				name: "ComboBox",
				desc: "A searchable combo box with optional multiple selection",
			},
			{
				href: "/docs/components/textarea",
				name: "Textarea",
				desc: "Multi-line text area",
			},
			{
				href: "/docs/components/form-field",
				name: "FormField",
				desc: "Form field wrapper with inline error display",
			},
		],
	},
	{
		label: "Display",
		items: [
			{
				href: "/docs/components/accordion",
				name: "Accordion",
				desc: "Collapsible sections with animated panels",
			},
			{
				href: "/docs/components/divider",
				name: "Divider",
				desc: "Horizontal or vertical separator with solid, dashed, and dotted variants",
			},
			{
				href: "/docs/components/alert",
				name: "Alert",
				desc: "Inline status banner with info, success, warning, and error variants",
			},
			{
				href: "/docs/components/avatar",
				name: "Avatar",
				desc: "User profile picture with image, initials, and icon fallback states",
			},
			{
				href: "/docs/components/badge",
				name: "Badge",
				desc: "Small inline label for counts, status, and tags",
			},
			{
				href: "/docs/components/card",
				name: "Card",
				desc: "Flexible content container with optional image, header, and footer",
			},
			{
				href: "/docs/components/code",
				name: "Code",
				desc: "Code block with syntax highlighting, line numbers, and a copy button",
			},
			{
				href: "/docs/components/popover",
				name: "Popover",
				desc: "Click-triggered floating panel for rich interactive content",
			},
			{
				href: "/docs/components/progress-bar",
				name: "ProgressBar",
				desc: "Horizontal bar showing completion state with determinate and indeterminate modes",
			},
			{
				href: "/docs/components/skeleton",
				name: "Skeleton",
				desc: "Shimmer placeholder that mimics content shape while loading",
			},
			{
				href: "/docs/components/spinner",
				name: "Spinner",
				desc: "Animated loading indicator for indeterminate progress",
			},
			{
				href: "/docs/components/table",
				name: "Table",
				desc: "Data table with column definitions and optional custom cell renderers",
			},
			{
				href: "/docs/components/tabs",
				name: "Tabs",
				desc: "Content-switching tabs with full WAI-ARIA keyboard support",
			},
			{
				href: "/docs/components/terminal",
				name: "Terminal",
				desc: "Terminal-style output block with a copy button",
			},
			{
				href: "/docs/components/tooltip",
				name: "Tooltip",
				desc: "Small floating label shown on hover and keyboard focus",
			},
		],
	},
	{
		label: "Overlays",
		items: [
			{
				href: "/docs/components/modal",
				name: "Modal",
				desc: "Dialog overlay with focus trapping, backdrop, and Escape to close",
			},
			{
				href: "/docs/components/toast",
				name: "Toast",
				desc: "Fixed-position notification with four variants and auto-dismiss",
			},
		],
	},
];

export default function DocsPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Components</h1>
				<p>
					All components are exported from <code>@anephenix/ui</code>. Import
					the stylesheet once at the top level of your app:
				</p>
				<Code
					code={"import '@anephenix/ui/dist/index.css';"}
					language="javascript"
				/>
				{categories.map((cat) => (
					<div key={cat.label}>
						<h2>{cat.label}</h2>
						<div className="docs-component-grid">
							{cat.items.map(({ href, name, desc }) => (
								<div key={href} className="docs-component-card-wrapper">
									<Card
										image={`/screenshots/${name}.png`}
										imageAlt={`${name} component preview`}
										title={name}
										footer={
											<div className="docs-card-actions">
												<a
													href={href}
													className="docs-card-action docs-card-action-docs"
												>
													Docs
												</a>
												<a
													href={`/preview?component=${name}`}
													className="docs-card-action docs-card-action-preview"
													target="_blank"
													rel="noopener noreferrer"
												>
													Preview
												</a>
											</div>
										}
									>
										{desc}
									</Card>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</DocsLayout>
	);
}
