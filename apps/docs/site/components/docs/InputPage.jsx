import { Input } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Input } from '@anephenix/ui';

<Input
  name="email"
  type="email"
  placeholder="you@example.com"
  onChange={(e) => console.log(e.target.value)}
/>`;

const svelteCode = `<script>
	import { Input } from "@anephenix/ui-svelte";
</script>

<Input
	name="email"
	type="email"
	placeholder="you@example.com"
	oninput={(e) => console.log(e.target.value)}
/>`;

export default function InputPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Input</h1>
				<p>
					A text input element. Accepts a <code>forwardRef</code>.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["type", "string", 'Input type. Defaults to "text".'],
						["name", "string", "Name attribute"],
						["className", "string", "CSS class(es)"],
						["defaultValue", "string", "Initial value"],
						["placeholder", "string", "Placeholder text"],
						["onChange", "function", "Change handler"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Input"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
				>
					<Input name="text-demo" placeholder="Text input" />
					<Input name="email-demo" type="email" placeholder="Email input" />
					<Input
						name="password-demo"
						type="password"
						placeholder="Password input"
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
