import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { CodeEditor } from '@anephenix/ui';

<CodeEditor
  title="greet.js"
  code={snippet}
  language="javascript"
  onFinishedTyping={(code) => console.log(code)}
/>`;

const svelteCode = `<script>
	import { CodeEditor } from "@anephenix/ui-svelte";
</script>

<CodeEditor
	title="greet.js"
	code={snippet}
	language="javascript"
	onfinishedtyping={(code) => console.log(code)}
/>`;

export default function CodeEditorPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>CodeEditor</h1>
				<p>
					An editable version of <a href="/docs/components/code">Code</a>: type
					or paste code directly into it, with line numbers that grow as you add
					lines, a resizable window, a fullscreen toggle, and a footer with a
					language switcher and a live line:column cursor position, styled
					identically to Code.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Title shown in the bar above the editor"],
						["code", "string", "The initial code shown in the editor"],
						[
							"language",
							"string",
							'Initial syntax-highlighting language. Defaults to "javascript"',
						],
						[
							"languages",
							"string[]",
							'Languages offered in the footer switcher. Defaults to ["javascript", "jsx", "css"]',
						],
						["width", "number", "Initial width in pixels. Defaults to 600"],
						[
							"height",
							"number",
							"Initial height of the scrollable code area in pixels. Defaults to 300",
						],
						[
							"resizable",
							"boolean",
							"Whether the bottom-right corner grip can resize the editor. Defaults to true",
						],
						[
							"expandable",
							"boolean",
							"Whether the green title-bar button can expand the editor to fill the browser window. Defaults to true",
						],
						[
							"onChange",
							"(code: string) => void",
							"Called on every keystroke with the current code",
						],
						[
							"onFinishedTyping",
							"(code: string) => void",
							"Called after typing pauses (or on blur) with the current code — useful for running or evaluating it elsewhere",
						],
						[
							"finishedTypingDelay",
							"number",
							"Milliseconds of inactivity before onFinishedTyping fires. Defaults to 800",
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="CodeEditor"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
			</div>
		</DocsLayout>
	);
}
