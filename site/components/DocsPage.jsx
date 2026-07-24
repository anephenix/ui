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
				href: "/docs/nav-bar",
				name: "NavBar",
				desc: "Responsive nav bar with desktop and mobile menus",
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
				href: "/docs/code",
				name: "Code",
				desc: "Code block with syntax highlighting, line numbers, and a copy button",
			},
			{
				href: "/docs/terminal",
				name: "Terminal",
				desc: "Terminal-style output block with a copy button",
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
				<pre>
					<code>{"import '@anephenix/ui/dist/index.css';"}</code>
				</pre>
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
