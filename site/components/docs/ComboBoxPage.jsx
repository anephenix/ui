import { useState } from "react";
import { Code, ComboBox } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const fruits = [
	{ value: "apple", label: "Apple" },
	{ value: "apricot", label: "Apricot" },
	{ value: "banana", label: "Banana" },
	{ value: "blueberry", label: "Blueberry" },
	{ value: "cherry", label: "Cherry" },
	{ value: "grape", label: "Grape" },
	{ value: "kiwi", label: "Kiwi" },
	{ value: "lemon", label: "Lemon" },
	{ value: "mango", label: "Mango" },
	{ value: "orange", label: "Orange" },
	{ value: "peach", label: "Peach" },
	{ value: "pear", label: "Pear" },
	{ value: "pineapple", label: "Pineapple" },
	{ value: "strawberry", label: "Strawberry" },
];

const usageSnippet = `const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const [selected, setSelected] = useState(null);

<ComboBox
  options={options}
  placeholder="Search fruit..."
  onSelect={(option) => setSelected(option)}
/>`;

export default function ComboBoxPage({ currentPath }) {
	const [selected, setSelected] = useState(null);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>ComboBox</h1>
				<p>
					A searchable input that filters a list of options as the user types.
					Supports keyboard navigation (arrow keys, Enter, Escape),
					outside-click dismissal, and full ARIA combobox semantics.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { ComboBox } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"options",
							"array",
							'Array of { value, label } objects. Defaults to "[]"',
						],
						[
							"value",
							"string",
							"Initial text value of the input (uncontrolled seed)",
						],
						[
							"onChange",
							"function",
							"Called with the current input string on every keystroke",
						],
						[
							"onSelect",
							"function",
							"Called with the selected { value, label } object when an option is chosen",
						],
						[
							"placeholder",
							"string",
							'Placeholder text for the input. Defaults to "Search..."',
						],
						[
							"disabled",
							"bool",
							"Disables the input and prevents interaction. Defaults to false",
						],
					]}
				/>

				<h2>Example</h2>
				<div className="docs-example">
					<ComboBox
						options={fruits}
						placeholder="Search fruit..."
						onSelect={(option) => setSelected(option)}
					/>
					{selected && (
						<p style={{ marginTop: "0.75rem", fontSize: "14px" }}>
							Selected: <strong>{selected.label}</strong> ({selected.value})
						</p>
					)}
				</div>
			</div>
		</DocsLayout>
	);
}
