import { Code, ProgressBar } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `<ProgressBar value={75} label="Uploading..." showValue />

<ProgressBar value={100} variant="success" label="Complete" showValue />

<ProgressBar indeterminate variant="default" label="Processing..." />`;

export default function ProgressBarPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>ProgressBar</h1>
				<p>
					A horizontal bar that communicates the completion state of an
					operation. Supports four colour variants, three sizes, an optional
					label and value display, and an indeterminate animated state for
					operations of unknown duration.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { ProgressBar } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["value", "number", "Current progress value. Defaults to 0"],
						["max", "number", "Maximum value. Defaults to 100"],
						[
							"variant",
							'"default" | "success" | "warning" | "error"',
							'Colour of the fill. Defaults to "default"',
						],
						[
							"size",
							'"sm" | "md" | "lg"',
							'Height of the bar. Defaults to "md"',
						],
						["label", "string", "Optional label rendered above the bar"],
						[
							"showValue",
							"bool",
							"Show the computed percentage to the right of the label. Defaults to false",
						],
						[
							"indeterminate",
							"bool",
							"Animates the bar for operations of unknown duration. Defaults to false",
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the wrapper",
						],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
				>
					<ProgressBar value={30} label="Default" showValue />
					<ProgressBar value={60} variant="success" label="Success" showValue />
					<ProgressBar value={75} variant="warning" label="Warning" showValue />
					<ProgressBar value={90} variant="error" label="Error" showValue />
					<ProgressBar indeterminate variant="default" label="Indeterminate" />
				</div>
			</div>
		</DocsLayout>
	);
}
