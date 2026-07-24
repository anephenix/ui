import { Code, FormField, Input } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `<FormField error="This field is required">
  <Input name="email" type="email" />
</FormField>`;

export default function FormFieldPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>FormField</h1>
				<p>
					A wrapper for form controls that displays a validation error message
					beneath the input when the <code>error</code> prop is set. The wrapper
					adds an <code>error</code> CSS class to the container when invalid,
					which form control styles can target.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { FormField } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["children", "node", "The form control(s) to wrap"],
						[
							"error",
							"string",
							"Error message to display; omit or pass undefined when valid",
						],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					<div>
						<p style={{ marginBottom: "0.5rem" }}>
							<strong>With an error</strong>
						</p>
						<FormField error="This field is required">
							<Input
								name="email-error"
								type="email"
								placeholder="you@example.com"
							/>
						</FormField>
					</div>
					<div>
						<p style={{ marginBottom: "0.5rem" }}>
							<strong>Without an error</strong>
						</p>
						<FormField>
							<Input
								name="email-valid"
								type="email"
								placeholder="you@example.com"
							/>
						</FormField>
					</div>
				</div>
			</div>
		</DocsLayout>
	);
}
