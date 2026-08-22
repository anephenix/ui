import { Badge } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Badge } from '@anephenix/ui';

// Status label
<Badge variant="success">Active</Badge>

// Count
<Badge variant="error" size="sm">99+</Badge>

// Tag
<Badge variant="default">React</Badge>`;

const svelteCode = `<script>
	import { Badge } from "@anephenix/ui-svelte";
</script>

<Badge variant="success">Active</Badge>
<Badge variant="error" size="sm">99+</Badge>`;

const variants = [
	"default",
	"primary",
	"secondary",
	"success",
	"warning",
	"info",
	"error",
];

const sizes = ["sm", "md", "lg"];

export default function BadgePage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Badge</h1>
				<p>
					A small inline label for counts, status indicators, and tags. Renders
					as a <code>&lt;span&gt;</code> so it flows naturally alongside text
					and other inline elements.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"children",
							"node",
							"The badge content — text, number, or short node",
						],
						[
							"variant",
							'"default" | "primary" | "secondary" | "success" | "warning" | "info" | "error"',
							'Colour scheme. Defaults to "default"',
						],
						["size", '"sm" | "md" | "lg"', 'Size preset. Defaults to "md"'],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Badge"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>

				<h3>Variants</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
				>
					{variants.map((v) => (
						<Badge key={v} variant={v}>
							{v.charAt(0).toUpperCase() + v.slice(1)}
						</Badge>
					))}
				</div>

				<h3>Sizes</h3>
				<div
					className="docs-example"
					style={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "0.5rem",
					}}
				>
					{sizes.map((s) => (
						<Badge key={s} size={s} variant="info">
							{s.toUpperCase()}
						</Badge>
					))}
				</div>

				<h3>Common uses</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
				>
					<Badge variant="success">Active</Badge>
					<Badge variant="warning">Pending</Badge>
					<Badge variant="default">Archived</Badge>
					<Badge variant="error" size="sm">
						99+
					</Badge>
					<Badge variant="info">Beta</Badge>
					<Badge variant="default">React</Badge>
					<Badge variant="default">TypeScript</Badge>
					<Badge variant="secondary">v3.1.0</Badge>
				</div>
			</div>
		</DocsLayout>
	);
}
