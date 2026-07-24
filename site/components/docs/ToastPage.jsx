import { useState } from "react";
import { Button, Code, Toast } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `const [isVisible, setIsVisible] = useState(false);

<Button
  text="Show notification"
  className="button theme-default primary"
  onClick={() => setIsVisible(true)}
/>

<Toast
  isVisible={isVisible}
  title="Saved"
  message="Your changes have been saved."
  variant="success"
  duration={4000}
  onClose={() => setIsVisible(false)}
/>`;

export default function ToastPage({ currentPath }) {
	const [variant, setVariant] = useState(null);

	const show = (v) => setVariant(v);
	const hide = () => setVariant(null);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Toast</h1>
				<p>
					A fixed-position notification that appears at a corner of the
					viewport. Supports four variants, optional auto-dismiss, and an
					optional title. Renders nothing when not visible.
				</p>

				<h2>Import</h2>
				<Code code={"import { Toast } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["isVisible", "bool", "Controls whether the toast is shown"],
						["message", "string", "The notification text"],
						["title", "string", "Optional bold heading above the message"],
						[
							"variant",
							'"info" | "success" | "warning" | "error"',
							'Visual style. Defaults to "info"',
						],
						[
							"position",
							'"top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"',
							'Corner of the viewport. Defaults to "top-right"',
						],
						[
							"duration",
							"number",
							"Milliseconds before auto-dismissing. Pass 0 to disable. Defaults to 4000",
						],
						[
							"onClose",
							"function",
							"Called when the close button is clicked or the duration elapses",
						],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
				>
					{["info", "success", "warning", "error"].map((v) => (
						<Button
							key={v}
							text={v.charAt(0).toUpperCase() + v.slice(1)}
							className={`button theme-default ${v === "info" ? "blue-one" : v === "success" ? "green-one" : v === "warning" ? "tertiary" : "primary"}`}
							onClick={() => show(v)}
						/>
					))}
				</div>

				<Toast
					isVisible={variant !== null}
					title={
						variant ? variant.charAt(0).toUpperCase() + variant.slice(1) : ""
					}
					message={
						variant === "success"
							? "Your changes have been saved."
							: variant === "error"
								? "Something went wrong. Please try again."
								: variant === "warning"
									? "This action cannot be undone."
									: "Here is some useful information."
					}
					variant={variant ?? "info"}
					duration={4000}
					onClose={hide}
				/>
			</div>
		</DocsLayout>
	);
}
