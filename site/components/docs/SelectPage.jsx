import { Code, Select } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const options = [
	{ value: "gb", label: "United Kingdom" },
	{ value: "us", label: "United States" },
	{ value: "de", label: "Germany" },
	{ value: "fr", label: "France" },
];

const exampleSnippet = `const options = [
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

<Select
  name="country"
  options={options}
  onChange={(e) => console.log(e.target.value)}
/>`;

export default function SelectPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Select</h1>
				<p>
					A styled <code>&lt;select&gt;</code> element. For multi-select support
					see the <a href="/docs/dropdown">Dropdown</a> component. Accepts a{" "}
					<code>forwardRef</code>.
				</p>

				<h2>Import</h2>
				<Code code={"import { Select } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["name", "string", "Name attribute"],
						["className", "string", "CSS class(es)"],
						["defaultValue", "string", "Initially selected value"],
						["onChange", "function", "Change handler"],
						["options", "array", "Array of { value, label } objects"],
					]}
				/>

				<h2>Example</h2>
				<div className="docs-example">
					<Select name="country" options={options} className="" />
				</div>
			</div>
		</DocsLayout>
	);
}
