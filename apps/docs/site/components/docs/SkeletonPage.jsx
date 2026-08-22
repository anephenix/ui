import { Skeleton } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Skeleton } from '@anephenix/ui';

<Skeleton width="60%" />
<Skeleton lines={3} />
<Skeleton width={48} height={48} borderRadius="50%" />`;

const svelteCode = `<script>
	import { Skeleton } from "@anephenix/ui-svelte";
</script>

<Skeleton width="60%" />
<Skeleton lines={3} />
<Skeleton width={48} height={48} borderRadius="50%" />`;

export default function SkeletonPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Skeleton</h1>
				<p>
					A shimmer placeholder that mimics the shape of content while it loads.
					Compose multiple skeletons to match the layout of the real content —
					the closer the match, the less jarring the transition.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"width",
							"string | number",
							'Width of the skeleton. Numbers are converted to px. Defaults to "100%"',
						],
						[
							"height",
							"string | number",
							'Height of the skeleton. Numbers are converted to px. Defaults to "1rem"',
						],
						[
							"borderRadius",
							"string",
							'Border radius. Use "50%" for circles. Defaults to "4px"',
						],
						[
							"lines",
							"number",
							"Render multiple stacked lines. The last line is 70% wide. Defaults to 1",
						],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Skeleton"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>

				<h3>Text and paragraphs</h3>
				<div
					className="docs-example"
					style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
				>
					<Skeleton width="40%" />
					<Skeleton lines={3} />
				</div>

				<h3>Avatar and profile row</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
				>
					<Skeleton width={48} height={48} borderRadius="50%" />
					<div
						style={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							gap: "0.4rem",
						}}
					>
						<Skeleton width="40%" height="0.875rem" />
						<Skeleton width="25%" height="0.75rem" />
					</div>
				</div>

				<h3>Card placeholder</h3>
				<div
					className="docs-example"
					style={{
						maxWidth: 280,
						display: "flex",
						flexDirection: "column",
						gap: "0.75rem",
					}}
				>
					<Skeleton height={160} />
					<Skeleton width="55%" height="1.1rem" />
					<Skeleton lines={2} />
				</div>
			</div>
		</DocsLayout>
	);
}
