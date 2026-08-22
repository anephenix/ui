import { FormField, Input } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { FormField, Input } from '@anephenix/ui';

<FormField error="This field is required">
  <Input name="email" type="email" />
</FormField>`;

const svelteCode = `<script>
	import { FormField, Input } from "@anephenix/ui-svelte";
</script>

<FormField error="This field is required">
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
				<ComponentExample
					component="FormField"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
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
