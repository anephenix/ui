import { Alert } from "@anephenix/ui";
import { useState } from "react";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Alert } from '@anephenix/ui';

// Persistent
<Alert variant="success" title="Saved">
  Your changes have been saved successfully.
</Alert>

// Dismissible
const [visible, setVisible] = useState(true);

{visible && (
  <Alert variant="warning" onClose={() => setVisible(false)}>
    Your session will expire in 5 minutes.
  </Alert>
)}`;

const svelteCode = `<script>
	import { Alert } from "@anephenix/ui-svelte";
</script>

<!-- Persistent -->
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>

<!-- Dismissible -->
<Alert variant="warning" onClose={() => (visible = false)}>
	Your session will expire in 5 minutes.
</Alert>`;

export default function AlertPage({ currentPath }) {
	const [dismissed, setDismissed] = useState({
		info: false,
		success: false,
		warning: false,
		error: false,
	});

	const dismiss = (variant) =>
		setDismissed((prev) => ({ ...prev, [variant]: true }));
	const reset = () =>
		setDismissed({ info: false, success: false, warning: false, error: false });

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Alert</h1>
				<p>
					An inline status banner for contextual feedback. Comes in four
					variants — <code>info</code>, <code>success</code>,{" "}
					<code>warning</code>, and <code>error</code>. Renders persistently by
					default; pass <code>onClose</code> to add a dismiss button.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"variant",
							'"info" | "success" | "warning" | "error"',
							'Visual style and ARIA role. Defaults to "info"',
						],
						["title", "string", "Optional bold heading above the body"],
						["children", "node", "The alert content — any React node"],
						[
							"onClose",
							"function",
							"Optional dismiss callback — renders a close button when provided",
						],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Alert"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
				>
					{!dismissed.info && (
						<Alert
							variant="info"
							title="Heads up"
							onClose={() => dismiss("info")}
						>
							This feature is currently in beta.
						</Alert>
					)}
					{!dismissed.success && (
						<Alert
							variant="success"
							title="Saved"
							onClose={() => dismiss("success")}
						>
							Your changes have been saved successfully.
						</Alert>
					)}
					{!dismissed.warning && (
						<Alert
							variant="warning"
							title="Warning"
							onClose={() => dismiss("warning")}
						>
							Your session will expire in 5 minutes.
						</Alert>
					)}
					{!dismissed.error && (
						<Alert
							variant="error"
							title="Error"
							onClose={() => dismiss("error")}
						>
							Could not connect to the server. Please try again.
						</Alert>
					)}
					{Object.values(dismissed).every(Boolean) && (
						<button
							type="button"
							className="button theme-default primary"
							onClick={reset}
						>
							Reset
						</button>
					)}
				</div>
			</div>
		</DocsLayout>
	);
}
