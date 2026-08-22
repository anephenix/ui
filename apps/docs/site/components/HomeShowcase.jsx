import {
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	ProgressBar,
	Switch,
} from "@anephenix/ui";

const items = [
	{
		title: "Buttons",
		caption: "Seven colour variants, each with a standard or outlined style.",
		demo: (
			<div className="home-showcase-demo">
				<Button text="Primary" className="button theme-default primary" />
				<Button
					text="Secondary"
					className="button theme-default secondary alternate"
				/>
			</div>
		),
	},
	{
		title: "Badges",
		caption: "Status labels, counts, and tags that flow inline with text.",
		demo: (
			<div className="home-showcase-demo">
				<Badge variant="success">Active</Badge>
				<Badge variant="info">Beta</Badge>
				<Badge variant="error" size="sm">
					99+
				</Badge>
			</div>
		),
	},
	{
		title: "Toggles",
		caption: "Accessible, keyboard-friendly switches with animated state.",
		demo: (
			<div className="home-showcase-demo">
				<Switch name="showcase-switch" label="Dark mode" defaultChecked />
			</div>
		),
	},
	{
		title: "Avatars",
		caption: "Photos, initials, or an icon fallback — chosen automatically.",
		demo: (
			<div className="home-showcase-demo">
				<Avatar name="Alice Brown" />
				<Avatar name="Bob Smith" shape="rounded" />
				<Avatar size="sm" />
			</div>
		),
	},
	{
		title: "Alerts",
		caption: "Four variants for contextual feedback, dismissible or not.",
		demo: (
			<div className="home-showcase-demo home-showcase-demo-block">
				<Alert variant="success" title="Saved">
					Your changes have been saved.
				</Alert>
			</div>
		),
	},
	{
		title: "Progress",
		caption: "Determinate and indeterminate states for any async operation.",
		demo: (
			<div className="home-showcase-demo home-showcase-demo-block">
				<ProgressBar value={70} variant="success" showValue />
			</div>
		),
	},
];

export default function HomeShowcase() {
	return (
		<div className="home-showcase">
			<h2>Everything you need</h2>
			<p className="home-showcase-lead">
				38 accessible, themeable components — the same design tokens power both
				the React and Svelte packages.
			</p>
			<div className="home-showcase-grid">
				{items.map(({ title, caption, demo }) => (
					<Card key={title} title={title}>
						{demo}
						<p className="home-showcase-caption">{caption}</p>
					</Card>
				))}
			</div>
		</div>
	);
}
