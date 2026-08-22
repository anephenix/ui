import { Breadcrumb } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Breadcrumb } from '@anephenix/ui';

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", href: "/products/laptops" },
    { label: "MacBook Pro" },
  ]}
/>`;

const svelteCode = `<script>
	import { Breadcrumb } from "@anephenix/ui-svelte";
</script>

<Breadcrumb
	items={[
		{ label: "Home", href: "/" },
		{ label: "Products", href: "/products" },
		{ label: "Laptops" },
	]}
/>`;

const docsItems = [
	{ label: "Home", href: "/" },
	{ label: "Docs", href: "/docs" },
	{ label: "Components", href: "/docs/components" },
	{ label: "Breadcrumb" },
];

const settingsItems = [
	{ label: "Home", href: "/" },
	{ label: "Settings", href: "/settings" },
	{ label: "Privacy" },
];

export default function BreadcrumbPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Breadcrumb</h1>
				<p>
					A navigation trail showing the user's location within a hierarchy.
					Follows the WAI-ARIA Breadcrumb pattern — wrapped in a{" "}
					<code>&lt;nav&gt;</code>, rendered as an <code>&lt;ol&gt;</code>, and
					the current page marked with <code>aria-current="page"</code>.
					Separators are hidden from screen readers via <code>aria-hidden</code>
					.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["items", "array", "Array of item objects — see shape below"],
						[
							"separator",
							"string | node",
							'Separator rendered between items. Defaults to "/"',
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the list",
						],
					]}
				/>

				<h2>Item shape</h2>
				<PropTable
					rows={[
						["label", "string", "Display text for this breadcrumb step"],
						[
							"href",
							"string",
							"URL for the link. Omit on the last item to mark it as the current page",
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Breadcrumb"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>

				<h3>Default separator</h3>
				<div className="docs-example">
					<Breadcrumb items={docsItems} />
				</div>

				<h3>Custom separator</h3>
				<div className="docs-example">
					<Breadcrumb items={settingsItems} separator="›" />
				</div>
			</div>
		</DocsLayout>
	);
}
