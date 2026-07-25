import { Card, Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const sections = [
	{
		href: "/docs/components",
		title: "Components",
		description:
			"30+ accessible, themeable React components grouped by category — forms, layout, display, overlays, and more.",
	},
	{
		href: "/docs/colours",
		title: "Colours",
		description:
			"The colour palette, CSS custom properties, and how colours map to component variants and button classes.",
	},
	{
		href: null,
		title: "Grid",
		description:
			"Layout grid, spacing scale, container utilities, and responsive breakpoints.",
		comingSoon: true,
	},
	{
		href: null,
		title: "Typography",
		description:
			"Type scale, font families, font weights, and text utility classes.",
		comingSoon: true,
	},
];

export default function DocsIndexPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Design System</h1>
				<p>
					Everything you need to build consistent UIs with{" "}
					<code>@anephenix/ui</code>. Import the stylesheet once at the top
					level of your app:
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
