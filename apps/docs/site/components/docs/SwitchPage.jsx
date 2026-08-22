import { Code, Switch } from "@anephenix/ui";
import { useState } from "react";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `// Uncontrolled
<Switch name="notifications" label="Enable notifications" defaultChecked={false} />

// Controlled
const [enabled, setEnabled] = useState(false);

<Switch
  name="darkMode"
  label="Dark mode"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>`;

export default function SwitchPage({ currentPath }) {
	const [darkMode, setDarkMode] = useState(false);
	const [notifications, setNotifications] = useState(true);
	const [updates, setUpdates] = useState(false);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Switch</h1>
				<p>
					A toggle switch for binary on/off settings. Built on a hidden{" "}
					<code>&lt;input type="checkbox"&gt;</code> with{" "}
					<code>role="switch"</code>. Supports both controlled and uncontrolled
					usage, accepts a <code>forwardRef</code>, and animates the thumb via
					CSS.
				</p>

				<h2>Import</h2>
				<Code code={"import { Switch } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						["name", "string", "Name attribute on the underlying input"],
						[
							"label",
							"string",
							"Optional label text rendered beside the switch",
						],
						["checked", "bool", "Checked state in controlled mode"],
						[
							"defaultChecked",
							"bool",
							"Initial checked state in uncontrolled mode",
						],
						[
							"onChange",
							"function",
							"Change handler — receives the native input change event",
						],
						["disabled", "bool", "Disables interaction and dims the switch"],
						[
							"className",
							"string",
							"Optional additional CSS class on the label",
						],
					]}
				/>

				<h2>Example</h2>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
				>
					<Switch
						name="dark-mode"
						label="Dark mode"
						checked={darkMode}
						onChange={(e) => setDarkMode(e.target.checked)}
					/>
					<Switch
						name="notifications"
						label="Enable notifications"
						checked={notifications}
						onChange={(e) => setNotifications(e.target.checked)}
					/>
					<Switch
						name="updates"
						label="Automatic updates"
						checked={updates}
						onChange={(e) => setUpdates(e.target.checked)}
					/>
					<Switch
						name="disabled-off"
						label="Disabled (off)"
						defaultChecked={false}
						disabled={true}
					/>
					<Switch
						name="disabled-on"
						label="Disabled (on)"
						defaultChecked={true}
						disabled={true}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
