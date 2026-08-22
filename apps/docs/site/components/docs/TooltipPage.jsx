import { Badge, Button, Code, Tooltip } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `<Tooltip content="Save your changes">
  <button type="button">Save</button>
</Tooltip>

// Custom position
<Tooltip content="Opens in a new tab" position="right">
  <a href="/docs">Documentation</a>
</Tooltip>

// Rich content
<Tooltip content={<span>Shortcut: <strong>Ctrl+S</strong></span>}>
  <button type="button">Save</button>
</Tooltip>`;

const positions = ["top", "right", "bottom", "left"];

export default function TooltipPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Tooltip</h1>
				<p>
					A small floating label that appears on hover and keyboard focus. Wraps
					any element without modifying it. Uses <code>role="tooltip"</code> for
					screen reader support and shows on both <code>mouseenter</code> and{" "}
					<code>focus</code> so keyboard users are covered.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Tooltip } from '@anephenix/ui';"}
					language="jsx"
				/>

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["content", "string | node", "The tooltip text or content"],
						[
							"position",
							'"top" | "bottom" | "left" | "right"',
							'Placement relative to the child. Defaults to "top"',
						],
						["children", "node", "The element the tooltip is attached to"],
						[
							"className",
							"string",
							"Optional additional CSS class on the tooltip bubble",
						],
					]}
				/>

				<h2>Example</h2>

				<h3>Positions</h3>
				<div
					className="docs-example"
					style={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "2rem",
						paddingTop: "2rem",
						paddingBottom: "2rem",
					}}
				>
					{positions.map((pos) => (
						<Tooltip key={pos} content={`Positioned ${pos}`} position={pos}>
							<Button text={pos} className="button theme-default secondary" />
						</Tooltip>
					))}
				</div>

				<h3>On various elements</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "1rem" }}
				>
					<Tooltip content="Primary action">
						<Button text="Save" className="button theme-default primary" />
					</Tooltip>

					<Tooltip content="Status: currently active">
						<Badge variant="success">Active</Badge>
					</Tooltip>

					<Tooltip
						content={
							<span>
								Shortcut: <strong>Ctrl+S</strong>
							</span>
						}
					>
						<span
							style={{
								fontSize: "13px",
								textDecoration: "underline dotted",
								cursor: "help",
							}}
						>
							keyboard shortcut
						</span>
					</Tooltip>
				</div>
			</div>
		</DocsLayout>
	);
}
