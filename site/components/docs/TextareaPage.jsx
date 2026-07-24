import { Code, Textarea } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `<Textarea
  name="message"
  placeholder="Enter your message here…"
  onChange={(e) => console.log(e.target.value)}
/>`;

export default function TextareaPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Textarea</h1>
				<p>
					A multi-line text area. Accepts a <code>forwardRef</code>.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Textarea } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

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
				<div className="docs-example">
					<Textarea name="message" placeholder="Enter your message here…" />
				</div>
			</div>
		</DocsLayout>
	);
}
