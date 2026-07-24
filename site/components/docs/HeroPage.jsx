import { Code, Hero } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const Link = ({ href, children, ...props }) => (
	<a href={href} {...props}>
		{children}
	</a>
);

const ctas = [
	{ href: "/get-started", text: "Get started", buttonClass: "primary" },
	{ href: "/docs", text: "Documentation", buttonClass: "secondary" },
];

const exampleSnippet = `const ctas = [
  { href: '/get-started', text: 'Get started', buttonClass: 'primary' },
  { href: '/docs', text: 'Documentation', buttonClass: 'secondary' },
];

<Hero
  title="A Design System for React"
  description="Built for Anephenix."
  ctas={ctas}
  Link={Link}
/>`;

export default function HeroPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Hero</h1>
				<p>
					A hero section with a main heading, a description, and one or more
					call-to-action buttons. Accepts an optional router <code>Link</code>{" "}
					component; falls back to a plain <code>&lt;a&gt;</code> tag if not
					provided.
				</p>

				<h2>Import</h2>
				<Code code={"import { Hero } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Main heading"],
						[
							"description",
							"string | node",
							"Short description. A plain string is automatically wrapped in <p>.",
						],
						["ctas", "array", "Array of { href, text, buttonClass } objects"],
						[
							"Link",
							"component",
							"Optional router link component. Falls back to <a>.",
						],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ padding: 0, overflow: "hidden" }}
				>
					<Hero
						title="A Design System for React"
						description="Built for Anephenix."
						ctas={ctas}
						Link={Link}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
