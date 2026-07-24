import { Code, Dropdown } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const options = [
	{ value: "js", text: "JavaScript" },
	{ value: "ts", text: "TypeScript" },
	{ value: "py", text: "Python" },
	{ value: "rb", text: "Ruby" },
];

const exampleSnippet = `const options = [
  { value: 'js', text: 'JavaScript' },
  { value: 'ts', text: 'TypeScript' },
];

<Dropdown name="language" options={options} />`;

export default function DropdownPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Dropdown</h1>
				<p>
					A styled dropdown built on a native <code>&lt;select&gt;</code>{" "}
					element. Supports multiple selection. Accepts a{" "}
					<code>forwardRef</code>.
				</p>
				<p>
					Options use a <code>text</code> field (not <code>label</code>) — this
					distinguishes it from the <a href="/docs/select">Select</a> component.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Dropdown } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["name", "string", "Name attribute"],
						["id", "string", "Element id"],
						["className", "string", "CSS class(es)"],
						["multiple", "bool", "Allow multiple selections"],
						["defaultValue", "string | array", "Initially selected value(s)"],
						["options", "array", "Array of { value, text } objects"],
					]}
				/>

				<h2>Example</h2>
				<div className="docs-example">
					<Dropdown name="language" options={options} className="" />
				</div>
			</div>
		</DocsLayout>
	);
}
