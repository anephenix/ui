import { RadioButton } from "@anephenix/ui";
import { useState } from "react";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const colourOptions = [
	{ value: "red", label: "Red" },
	{ value: "blue", label: "Blue" },
	{ value: "green", label: "Green" },
];

const reactCode = `import { RadioButton } from '@anephenix/ui';

const [selected, setSelected] = useState('');

<RadioButton
  name="colour"
  label="Red"
  value="red"
  checked={selected === 'red'}
  onChange={() => setSelected('red')}
/>
<RadioButton
  name="colour"
  label="Blue"
  value="blue"
  checked={selected === 'blue'}
  onChange={() => setSelected('blue')}
/>`;

const svelteCode = `<script>
	import { RadioButton } from "@anephenix/ui-svelte";

	let selected = $state("");
</script>

<RadioButton
	name="colour"
	label="Red"
	value="red"
	checked={selected === "red"}
	onchange={() => (selected = "red")}
/>`;

export default function RadioButtonPage({ currentPath }) {
	const [selected, setSelected] = useState("");

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>RadioButton</h1>
				<p>
					A styled radio button with a label. Group multiple radio buttons by
					giving them the same <code>name</code>. Accepts a{" "}
					<code>forwardRef</code>.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"name",
							"string",
							"Shared group name attribute — all options in a group share this",
						],
						["label", "string", "Label text"],
						["className", "string", "CSS class(es)"],
						[
							"value",
							"string",
							"Value for this option (used in controlled mode)",
						],
						[
							"checked",
							"bool",
							"Whether this option is selected (controlled mode)",
						],
						[
							"onChange",
							"function",
							"Called when this option is selected (controlled mode)",
						],
						[
							"defaultValue",
							"string",
							"Value attribute for uncontrolled usage",
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="RadioButton"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div className="docs-example">
					<div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
						{colourOptions.map(({ value, label }) => (
							<RadioButton
								key={value}
								name="colour-demo"
								label={label}
								value={value}
								checked={selected === value}
								onChange={() => setSelected(value)}
								className=""
							/>
						))}
					</div>
					{selected && (
						<p style={{ marginTop: "0.75rem", marginBottom: 0 }}>
							Selected: <strong>{selected}</strong>
						</p>
					)}
				</div>
			</div>
		</DocsLayout>
	);
}
