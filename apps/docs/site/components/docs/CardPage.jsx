import { Button, Card } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Button, Card } from '@anephenix/ui';

<Card
  title="Getting started"
  subtitle="Up and running in minutes"
  footer={<Button text="View docs" className="button theme-default primary" />}
>
  <p>Build consistent UIs with a plain-CSS design system.</p>
</Card>`;

const svelteCode = `<script>
	import { Button, Card } from "@anephenix/ui-svelte";
</script>

<Card title="Getting started" subtitle="Up and running in minutes">
	{#snippet footer()}
		<Button text="View docs" class="button theme-default primary" />
	{/snippet}
	<p>Build consistent UIs with a plain-CSS design system.</p>
</Card>`;

export default function CardPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Card</h1>
				<p>
					A flexible content container with optional image, header, body, and
					footer sections. Width fills the parent — use a grid or flex layout to
					control how many cards appear per row.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Optional heading in the card header"],
						["subtitle", "string", "Optional secondary line below the title"],
						[
							"image",
							"string",
							"Optional URL for a cover image at the top of the card",
						],
						[
							"imageAlt",
							"string",
							'Alt text for the image. Defaults to "" (decorative)',
						],
						["children", "node", "Main body content"],
						[
							"footer",
							"node",
							"Optional footer content — typically action buttons",
						],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Card"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div
					className="docs-example"
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
						gap: "1rem",
					}}
				>
					<Card title="Plain card" subtitle="Body content only">
						<p>
							This card has no footer. Use it for read-only content where no
							action is needed.
						</p>
					</Card>

					<Card
						title="With footer"
						subtitle="Includes action buttons"
						footer={
							<>
								<Button
									text="Cancel"
									className="button theme-default secondary alternate"
								/>
								<Button
									text="Confirm"
									className="button theme-default primary"
								/>
							</>
						}
					>
						<p>Pass any React node to the footer prop to render actions.</p>
					</Card>

					<Card
						image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
						imageAlt="Mountain landscape at sunrise"
						title="Cover image"
						subtitle="image prop adds a full-width photo"
						footer={
							<Button
								text="Explore"
								className="button theme-default blue-one"
							/>
						}
					>
						<p>
							The image sits flush at the top, clipped by the card
							border-radius.
						</p>
					</Card>
				</div>
			</div>
		</DocsLayout>
	);
}
