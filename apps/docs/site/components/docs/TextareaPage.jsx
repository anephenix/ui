import { Textarea } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Textarea } from '@anephenix/ui';

<Textarea
  name="message"
  placeholder="Enter your message here…"
  onChange={(e) => console.log(e.target.value)}
/>`;

const svelteCode = `<script>
	import { Textarea } from "@anephenix/ui-svelte";
</script>

<Textarea name="message" placeholder="Enter your message..." oninput={handleChange} />`;

export default function TextareaPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Textarea</h1>
				<p>
					A multi-line text area. Accepts a <code>forwardRef</code>.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["name", "string", "Name attribute"],
						["className", "string", "CSS class(es)"],
						["defaultValue", "string", "Initial value"],
						["placeholder", "string", "Placeholder text"],
						["onChange", "function", "Change handler"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Textarea"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div className="docs-example">
					<Textarea name="message" placeholder="Enter your message here…" />
				</div>
			</div>
		</DocsLayout>
	);
}
