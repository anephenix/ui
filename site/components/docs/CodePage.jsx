import { Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
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

const usageSnippet = `<Code
  title="LoginForm.jsx"
  code={snippet}
  language="jsx"
/>`;

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

				<h2>Import</h2>
				<Code code={"import { Code } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code
					code={usageSnippet}
					language="jsx"
					style={{ marginTop: "1.5rem" }}
				/>

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
				<Code title="LoginForm.jsx" code={snippet} language="jsx" />
			</div>
		</DocsLayout>
	);
}
