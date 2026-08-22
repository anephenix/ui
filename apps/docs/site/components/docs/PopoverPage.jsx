import { Button, Input, Popover, Switch } from "@anephenix/ui";
import { useState } from "react";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Button, Popover } from '@anephenix/ui';

<Popover
  trigger={<Button text="Options" className="button theme-default secondary" />}
  title="Display options"
  content={<p>Popover body content.</p>}
  position="bottom"
/>`;

const svelteCode = `<script>
	import { Popover, Switch } from "@anephenix/ui-svelte";
</script>

<Popover title="Display options" position="bottom">
	{#snippet trigger(triggerProps)}
		<button type="button" class="button theme-default secondary" {...triggerProps}>
			Options
		</button>
	{/snippet}
	{#snippet content()}
		<Switch name="dark" label="Dark mode" />
	{/snippet}
</Popover>`;

const positions = ["top", "right", "bottom", "left"];

export default function PopoverPage({ currentPath }) {
	const [notifications, setNotifications] = useState(true);
	const [updates, setUpdates] = useState(false);

	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Popover</h1>
				<p>
					A floating panel triggered by clicking an element. Richer than a{" "}
					<a href="/docs/tooltip">Tooltip</a> — the content can contain
					interactive elements like forms, switches, or buttons. Closes on
					Escape, outside click, or the × button.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"trigger",
							"element",
							"The element that toggles the popover — receives onClick, aria-expanded, and aria-haspopup automatically",
						],
						["content", "node", "Content rendered in the popover body"],
						["title", "string", "Optional heading shown in the popover header"],
						[
							"position",
							'"bottom" | "top" | "left" | "right"',
							'Placement relative to the trigger. Defaults to "bottom"',
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the popover panel",
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Popover"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>

				<h3>Positions</h3>
				<div
					className="docs-example"
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "1rem",
						paddingTop: "3rem",
						paddingBottom: "3rem",
					}}
				>
					{positions.map((pos) => (
						<Popover
							key={pos}
							position={pos}
							trigger={
								<Button text={pos} className="button theme-default secondary" />
							}
							title={`Position: ${pos}`}
							content={<p>This popover is anchored to the {pos}.</p>}
						/>
					))}
				</div>

				<h3>With interactive content</h3>
				<div className="docs-example">
					<Popover
						trigger={
							<Button
								text="Notification settings"
								className="button theme-default primary"
							/>
						}
						title="Notifications"
						content={
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.75rem",
								}}
							>
								<Switch
									name="popover-notifications"
									label="Email notifications"
									checked={notifications}
									onChange={(e) => setNotifications(e.target.checked)}
								/>
								<Switch
									name="popover-updates"
									label="Product updates"
									checked={updates}
									onChange={(e) => setUpdates(e.target.checked)}
								/>
							</div>
						}
					/>
				</div>

				<h3>With a form</h3>
				<div className="docs-example">
					<Popover
						trigger={
							<Button
								text="Quick add"
								className="button theme-default green-one"
							/>
						}
						title="Add item"
						content={
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "0.75rem",
								}}
							>
								<Input name="popover-item" placeholder="Item name" />
								<Button text="Add" className="button theme-default primary" />
							</div>
						}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
