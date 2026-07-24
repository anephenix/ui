import { Code, Tabs } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `import { Tabs } from '@anephenix/ui';

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <p>An overview of the product.</p>,
  },
  {
    id: 'specs',
    label: 'Specifications',
    content: <p>Technical specifications here.</p>,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    content: <p>Customer reviews here.</p>,
  },
];

<Tabs tabs={tabs} defaultTab="overview" onChange={(id) => console.log(id)} />`;

const exampleTabs = [
	{
		id: "overview",
		label: "Overview",
		content: (
			<div>
				<p>
					This component library provides a set of accessible, themeable React
					components built on a plain-CSS design system.
				</p>
				<p style={{ marginTop: "0.75rem" }}>
					Each component is designed to be small, composable, and easy to drop
					into any React project.
				</p>
			</div>
		),
	},
	{
		id: "specs",
		label: "Specifications",
		content: (
			<ul style={{ paddingLeft: "1.25rem", lineHeight: 1.8 }}>
				<li>React 18+</li>
				<li>Zero runtime dependencies beyond React</li>
				<li>Plain CSS with custom properties — no preprocessor required</li>
				<li>Full dark mode support via prefers-color-scheme</li>
			</ul>
		),
	},
	{
		id: "reviews",
		label: "Reviews",
		content: (
			<div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
				<blockquote
					style={{
						margin: 0,
						borderLeft: "3px solid #ccc",
						paddingLeft: "0.75rem",
					}}
				>
					<p>"Exactly what I needed — no bloat, just components."</p>
					<footer
						style={{ fontSize: "13px", opacity: 0.7, marginTop: "0.25rem" }}
					>
						— Alice C.
					</footer>
				</blockquote>
				<blockquote
					style={{
						margin: 0,
						borderLeft: "3px solid #ccc",
						paddingLeft: "0.75rem",
					}}
				>
					<p>"The dark mode support worked out of the box."</p>
					<footer
						style={{ fontSize: "13px", opacity: 0.7, marginTop: "0.25rem" }}
					>
						— Bob S.
					</footer>
				</blockquote>
			</div>
		),
	},
];

export default function TabsPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Tabs</h1>
				<p>
					A content-switching component following the WAI-ARIA tabs pattern.
					Supports keyboard navigation with arrow keys, roving{" "}
					<code>tabIndex</code>, and full <code>aria-*</code> wiring between
					tabs and panels.
				</p>

				<h2>Import</h2>
				<Code code={"import { Tabs } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["tabs", "array", "Array of tab objects — see shape below"],
						[
							"defaultTab",
							"string",
							"Id of the initially selected tab. Defaults to the first tab",
						],
						[
							"onChange",
							"function",
							"Optional (id) => void called whenever the active tab changes",
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the wrapper",
						],
					]}
				/>

				<h2>Tab object shape</h2>
				<PropTable
					rows={[
						[
							"id",
							"string",
							"Unique identifier — used for ARIA wiring and as the React key",
						],
						["label", "string", "Text shown on the tab button"],
						["content", "node", "Content rendered in the tab panel"],
					]}
				/>

				<h2>Example</h2>
				<div className="docs-example">
					<Tabs tabs={exampleTabs} defaultTab="overview" />
				</div>
			</div>
		</DocsLayout>
	);
}
