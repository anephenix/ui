import { Code } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const snippet = `import { Button, Input } from '@anephenix/ui';
import '@anephenix/ui/dist/index.css';

export default function LoginForm() {
  return (
    <form>
      <Input name="email" type="email" placeholder="you@example.com" />
      <Button text="Sign in" className="button theme-default primary" />
    </form>
  );
}`;

const reactCode = `import { Code } from '@anephenix/ui';

<Code
  title="LoginForm.jsx"
  code={snippet}
  language="jsx"
/>`;

const svelteCode = `<script>
	import { Code } from "@anephenix/ui-svelte";
</script>

<Code title="LoginForm.jsx" code={snippet} language="jsx" />`;

export default function CodePage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Code</h1>
				<p>
					A code block with syntax highlighting (via{" "}
					<code>react-highlight</code>), line numbers, a title bar, and a copy
					button.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Title shown in the bar above the code"],
						["code", "string", "The code string to display"],
						[
							"language",
							"string",
							'Syntax highlighting language. Defaults to "javascript"',
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Code"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<Code title="LoginForm.jsx" code={snippet} language="jsx" />
			</div>
		</DocsLayout>
	);
}
