import { Button, Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const variants = [
	"primary",
	"secondary",
	"tertiary",
	"green-one",
	"green-two",
	"blue-one",
	"blue-two",
];

const exampleSnippet = `<Button
  text="Submit"
  className="button theme-default primary"
  onClick={() => console.log('clicked')}
/>`;

export default function ButtonPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Button</h1>
				<p>
					A simple <code>&lt;button&gt;</code> element. Seven colour variants
					are available, each with a standard and an alternate (outlined) style.
					Accepts a <code>forwardRef</code>.
				</p>

				<h2>Import</h2>
				<Code code={"import { Button } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["text", "string", "Button label"],
						["name", "string", "Name attribute"],
						["className", "string", "CSS class(es)"],
						["onClick", "function", "Click handler"],
					]}
				/>

				<h2>Variants</h2>
				<p>
					Combine a variant class with <code>button theme-default</code>. Add{" "}
					<code>alternate</code> for the outlined style.
				</p>

				<h3>Standard</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
				>
					{variants.map((v) => (
						<Button key={v} text={v} className={`button theme-default ${v}`} />
					))}
				</div>

				<h3>Alternate (outlined)</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
				>
					{variants.map((v) => (
						<Button
							key={v}
							text={v}
							className={`button theme-default alternate ${v}`}
						/>
					))}
				</div>
			</div>
		</DocsLayout>
	);
}
