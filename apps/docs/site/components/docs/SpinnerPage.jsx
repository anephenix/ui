import { Button, Code, Spinner } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `// Standalone
<Spinner />

// Inside a button (loading state)
<button type="button" disabled style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <Spinner size="sm" label="Saving..." />
  Saving...
</button>`;

const sizes = ["sm", "md", "lg"];

export default function SpinnerPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Spinner</h1>
				<p>
					An animated loading indicator for indeterminate progress. Renders a
					pure-CSS rotating ring. Use it standalone for page or section loading,
					or inline inside a button to indicate a pending action.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Spinner } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"size",
							'"sm" | "md" | "lg"',
							'Controls the diameter and border width. Defaults to "md"',
						],
						[
							"label",
							"string",
							'Accessible aria-label for screen readers. Defaults to "Loading..."',
						],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>

				<h3>Sizes</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
				>
					{sizes.map((s) => (
						<Spinner key={s} size={s} label={`Loading (${s})`} />
					))}
				</div>

				<h3>Inside a button</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
				>
					<Button text="Save" className="button theme-default primary" />
					<button
						type="button"
						disabled
						className="button theme-default primary"
						style={{
							display: "inline-flex",
							alignItems: "center",
							gap: "0.5rem",
							opacity: 0.8,
						}}
					>
						<Spinner size="sm" label="Saving..." />
						Saving…
					</button>
				</div>
			</div>
		</DocsLayout>
	);
}
