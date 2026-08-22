import { Code, Divider } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { LivePreview } from "./LivePreview.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `// Basic horizontal divider
<Divider />

// With a label
<Divider label="or" />

// Dashed variant
<Divider variant="dashed" />

// Vertical (inside a flex container)
<div style={{ display: 'flex', height: '2rem', alignItems: 'center', gap: '1rem' }}>
  <span>Left</span>
  <Divider orientation="vertical" />
  <span>Right</span>
</div>`;

export default function DividerPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Divider</h1>
				<p>
					A visual separator between sections of content. Supports horizontal
					and vertical orientations, three line styles, and an optional centred
					text label.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Divider } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"orientation",
							'"horizontal" | "vertical"',
							'Direction of the divider. Defaults to "horizontal"',
						],
						[
							"variant",
							'"solid" | "dashed" | "dotted"',
							'Line style. Defaults to "solid"',
						],
						["label", "string", "Optional text centred on the divider line"],
						[
							"className",
							"string",
							"Optional additional CSS class on the wrapper",
						],
					]}
				/>

				<h2>Example</h2>
				<LivePreview component="Divider" />
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<div>
						<p style={{ marginBottom: "0.75rem", fontSize: "14px" }}>
							Solid (default)
						</p>
						<Divider />
					</div>
					<div>
						<p style={{ marginBottom: "0.75rem", fontSize: "14px" }}>Dashed</p>
						<Divider variant="dashed" />
					</div>
					<div>
						<p style={{ marginBottom: "0.75rem", fontSize: "14px" }}>Dotted</p>
						<Divider variant="dotted" />
					</div>
					<div>
						<p style={{ marginBottom: "0.75rem", fontSize: "14px" }}>
							With label
						</p>
						<Divider label="or" />
					</div>
					<div>
						<p style={{ marginBottom: "0.75rem", fontSize: "14px" }}>
							Vertical
						</p>
						<div
							style={{
								display: "flex",
								height: "2rem",
								alignItems: "center",
								gap: "1rem",
							}}
						>
							<span style={{ fontSize: "14px" }}>Section A</span>
							<Divider orientation="vertical" />
							<span style={{ fontSize: "14px" }}>Section B</span>
							<Divider orientation="vertical" variant="dashed" />
							<span style={{ fontSize: "14px" }}>Section C</span>
						</div>
					</div>
				</div>
			</div>
		</DocsLayout>
	);
}
