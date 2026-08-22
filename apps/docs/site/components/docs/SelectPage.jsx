import { Select } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const options = [
	{ value: "gb", label: "United Kingdom" },
	{ value: "us", label: "United States" },
	{ value: "de", label: "Germany" },
	{ value: "fr", label: "France" },
];

const reactCode = `import { Select } from '@anephenix/ui';

const options = [
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

<Select
  name="country"
  options={options}
  onChange={(e) => console.log(e.target.value)}
/>`;

const svelteCode = `<script>
	import { Select } from "@anephenix/ui-svelte";

	const options = [
		{ value: "gb", label: "United Kingdom" },
		{ value: "us", label: "United States" },
	];
</script>

<Select name="country" {options} onchange={handleChange} />`;

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
				<ComponentExample
					component="Select"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div className="docs-example">
					<Select name="country" options={options} className="" />
				</div>
			</div>
		</DocsLayout>
	);
}
