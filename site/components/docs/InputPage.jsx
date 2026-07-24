import { Code, Input } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `<Input
  name="email"
  type="email"
  placeholder="you@example.com"
  onChange={(e) => console.log(e.target.value)}
/>`;

export default function InputPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Input</h1>
				<p>
					A text input element. Accepts a <code>forwardRef</code>.
				</p>

				<h2>Import</h2>
				<Code code={"import { Input } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

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
