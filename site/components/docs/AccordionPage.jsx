import { Accordion, Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `const items = [
  {
    id: 'q1',
    title: 'What is this library?',
    content: <p>A set of accessible React components.</p>,
  },
  {
    id: 'q2',
    title: 'How do I install it?',
    content: <p>Run <code>npm i @anephenix/ui</code>.</p>,
  },
];

// Single open at a time (default)
<Accordion items={items} />

// Allow multiple open simultaneously
<Accordion items={items} allowMultiple />

// Start with an item open
<Accordion items={items} defaultOpen="q1" />`;

const faqItems = [
	{
		id: "what",
		title: "What is this component library?",
		content: (
			<p>
				A set of accessible, plain-CSS React components built on a design system
				of CSS custom properties. No preprocessor required.
			</p>
		),
	},
	{
		id: "install",
		title: "How do I install it?",
		content: (
			<p>
				Run <code>npm i @anephenix/ui</code> and import the CSS:{" "}
				<code>import '@anephenix/ui/dist/index.css'</code>.
			</p>
		),
	},
	{
		id: "darkmode",
		title: "Does it support dark mode?",
		content: (
			<p>
				Yes. All components respond to the{" "}
				<code>prefers-color-scheme: dark</code> media query automatically. No
				extra configuration needed.
			</p>
		),
	},
	{
		id: "license",
		title: "What licence is it released under?",
		content: (
			<p>The MIT Licence. Free to use in personal and commercial projects.</p>
		),
	},
];

const settingsItems = [
	{
		id: "notifications",
		title: "Notifications",
		content: (
			<p>Configure how and when you receive email and in-app notifications.</p>
		),
	},
	{
		id: "privacy",
		title: "Privacy",
		content: (
			<p>Control your data sharing preferences and visibility settings.</p>
		),
	},
	{
		id: "security",
		title: "Security",
		content: (
			<p>
				Manage your password, two-factor authentication, and active sessions.
			</p>
		),
	},
];

export default function AccordionPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Accordion</h1>
				<p>
					A vertically stacked list of items that each expand and collapse to
					reveal their content. Follows the WAI-ARIA Accordion pattern with{" "}
					<code>aria-expanded</code>, <code>aria-controls</code>, and{" "}
					<code>role="region"</code>. Panels animate open and closed using a
					pure-CSS grid technique.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Accordion } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["items", "array", "Array of item objects — see shape below"],
						[
							"allowMultiple",
							"bool",
							"Allow more than one panel open at a time. Defaults to false",
						],
						[
							"defaultOpen",
							"string | string[]",
							"Id(s) of item(s) open on first render",
						],
						[
							"onChange",
							"function",
							"Called with an array of currently open ids whenever state changes",
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the wrapper",
						],
					]}
				/>

				<h2>Item shape</h2>
				<PropTable
					rows={[
						[
							"id",
							"string",
							"Unique identifier — used for ARIA wiring and React key",
						],
						["title", "string", "Text shown in the trigger button"],
						["content", "node", "Content revealed when the item is open"],
					]}
				/>

				<h2>Example</h2>

				<h3>FAQ (single open)</h3>
				<div className="docs-example">
					<Accordion items={faqItems} defaultOpen="what" />
				</div>

				<h3>Settings (multiple open)</h3>
				<div className="docs-example">
					<Accordion
						items={settingsItems}
						allowMultiple
						defaultOpen={["notifications", "security"]}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
