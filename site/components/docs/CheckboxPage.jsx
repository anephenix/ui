import { Checkbox, Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `<Checkbox
  name="agree"
  label="I agree to the terms"
  defaultValue={false}
/>`;

export default function CheckboxPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Checkbox</h1>
				<p>
					A styled checkbox with a label. Accepts a <code>forwardRef</code>.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Checkbox } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["name", "string", "Name attribute"],
						["label", "string", "Label text"],
						["className", "string", "CSS class(es)"],
						["defaultValue", "bool", "Whether checked by default"],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
				>
					<Checkbox
						name="demo-unchecked"
						label="Unchecked by default"
						defaultValue={false}
						className=""
					/>
					<Checkbox
						name="demo-checked"
						label="Checked by default"
						defaultValue={true}
						className=""
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
