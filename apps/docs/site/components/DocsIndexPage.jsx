import { Card, Code } from "@anephenix/ui";
import DocsLayout from "./DocsLayout.jsx";

const sections = [
	{
		href: "/docs/components",
		title: "Components",
		description:
			"38 accessible, themeable components for React and Svelte, grouped by category — forms, layout, display, overlays, and more.",
	},
	{
		href: "/docs/colours",
		title: "Colours",
		description:
			"The colour palette, CSS custom properties, and how colours map to component variants and button classes.",
	},
	{
		href: "/docs/grid",
		title: "Grid",
		description:
			"The 8px base grid, spacing scale (--spacer-one through --spacer-five), and responsive breakpoints.",
	},
	{
		href: "/docs/layout",
		title: "Layout",
		description:
			"The .page, .container, and .withSidePadding utility classes that structure pages at the macro level.",
	},
	{
		href: "/docs/typography",
		title: "Typography",
		description:
			"Font families, heading scale (h1–h4 under .theme-default), body text, and monospace styles.",
	},
];

export default function DocsIndexPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Design System</h1>
				<p>
					Everything you need to build consistent UIs with{" "}
					<code>@anephenix/ui</code> (React) or{" "}
					<code>@anephenix/ui-svelte</code> (Svelte) — both share the same
					design tokens. Import the stylesheet once at the top level of your
					app:
				</p>
				<Code
					code={"import '@anephenix/ui/dist/index.css';"}
					language="javascript"
				/>
				<div className="docs-index-grid">
					{sections.map(({ href, title, description, comingSoon }) =>
						comingSoon ? (
							<div key={title} className="docs-index-card-disabled">
								<Card title={title}>
									<p style={{ margin: "0 0 0.5rem" }}>{description}</p>
									<span className="docs-index-badge">Coming soon</span>
								</Card>
							</div>
						) : (
							<a key={href} href={href} className="docs-index-card-link">
								<Card title={title}>{description}</Card>
							</a>
						),
					)}
				</div>
			</div>
		</DocsLayout>
	);
}
