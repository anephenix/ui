import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const categories = [
	{
		label: "Layout",
		items: [
			{ href: "/docs/page", name: "Page", desc: "Full-page wrapper div" },
			{
				href: "/docs/hero",
				name: "Hero",
				desc: "Hero section with heading, description, and call-to-action buttons",
			},
			{
				href: "/docs/footer",
				name: "Footer",
				desc: "Two-column page footer",
			},
		],
	},
	{
		label: "Navigation",
		items: [
			{
				href: "/docs/breadcrumb",
				name: "Breadcrumb",
				desc: "Navigation trail showing location within a hierarchy",
			},
			{
				href: "/docs/nav-bar",
				name: "NavBar",
				desc: "Responsive nav bar with desktop and mobile menus",
			},
			{
				href: "/docs/pagination",
				name: "Pagination",
				desc: "Page-number controls with first, previous, next, and last buttons",
			},
		],
	},
	{
		label: "Forms",
		items: [
			{
				href: "/docs/button",
				name: "Button",
				desc: "Button element with seven colour variants",
			},
			{
				href: "/docs/checkbox",
				name: "Checkbox",
				desc: "Styled checkbox with a label",
			},
			{
				href: "/docs/switch",
				name: "Switch",
				desc: "Toggle switch for binary on/off settings",
			},
			{
				href: "/docs/input",
				name: "Input",
				desc: "Text input element",
			},
			{
				href: "/docs/radio-button",
				name: "RadioButton",
				desc: "Styled radio button with a label",
			},
			{
				href: "/docs/select",
				name: "Select",
				desc: "Styled select element",
			},
			{
				href: "/docs/dropdown",
				name: "Dropdown",
				desc: "Styled dropdown with optional multiple selection",
			},
			{
				href: "/docs/combo-box",
				name: "ComboBox",
				desc: "A searchable combo box with optional multiple selection",
			},
			{
				href: "/docs/textarea",
				name: "Textarea",
				desc: "Multi-line text area",
			},
			{
				href: "/docs/form-field",
				name: "FormField",
				desc: "Form field wrapper with inline error display",
			},
		],
	},
	{
		label: "Display",
		items: [
			{
				href: "/docs/accordion",
				name: "Accordion",
				desc: "Collapsible sections with animated panels",
			},
			{
				href: "/docs/alert",
				name: "Alert",
				desc: "Inline status banner with info, success, warning, and error variants",
			},
			{
				href: "/docs/avatar",
				name: "Avatar",
				desc: "User profile picture with image, initials, and icon fallback states",
			},
			{
				href: "/docs/badge",
				name: "Badge",
				desc: "Small inline label for counts, status, and tags",
			},
			{
				href: "/docs/card",
				name: "Card",
				desc: "Flexible content container with optional image, header, and footer",
			},
			{
				href: "/docs/code",
				name: "Code",
				desc: "Code block with syntax highlighting, line numbers, and a copy button",
			},
			{
				href: "/docs/popover",
				name: "Popover",
				desc: "Click-triggered floating panel for rich interactive content",
			},
			{
				href: "/docs/skeleton",
				name: "Skeleton",
				desc: "Shimmer placeholder that mimics content shape while loading",
			},
			{
				href: "/docs/spinner",
				name: "Spinner",
				desc: "Animated loading indicator for indeterminate progress",
			},
			{
				href: "/docs/table",
				name: "Table",
				desc: "Data table with column definitions and optional custom cell renderers",
			},
			{
				href: "/docs/tabs",
				name: "Tabs",
				desc: "Content-switching tabs with full WAI-ARIA keyboard support",
			},
			{
				href: "/docs/terminal",
				name: "Terminal",
				desc: "Terminal-style output block with a copy button",
			},
			{
				href: "/docs/tooltip",
				name: "Tooltip",
				desc: "Small floating label shown on hover and keyboard focus",
			},
		],
	},
	{
		label: "Overlays",
		items: [
			{
				href: "/docs/modal",
				name: "Modal",
				desc: "Dialog overlay with focus trapping, backdrop, and Escape to close",
			},
			{
				href: "/docs/toast",
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
								<a key={href} href={href} className="docs-component-card">
									<strong>{name}</strong>
									<p>{desc}</p>
								</a>
							))}
						</div>
					</div>
				))}
			</div>
		</DocsLayout>
	);
}
