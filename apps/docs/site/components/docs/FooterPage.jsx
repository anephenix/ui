import { Footer } from "@anephenix/ui";
import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { Footer } from '@anephenix/ui';

<Footer
  leftSection={<span>&copy; 2026 Acme Ltd.</span>}
  rightSection={<a href="/privacy">Privacy policy</a>}
/>`;

const svelteCode = `<script>
	import { Footer } from "@anephenix/ui-svelte";
</script>

<Footer>
	{#snippet leftSection()}<span>&copy; 2026 Acme Ltd.</span>{/snippet}
	{#snippet rightSection()}<a href="/privacy">Privacy</a>{/snippet}
</Footer>`;

export default function FooterPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Footer</h1>
				<p>
					A two-column footer with a left section and a right section, both
					accepting arbitrary React nodes.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["leftSection", "node", "Content for the left side of the footer"],
						[
							"rightSection",
							"node",
							"Content for the right side of the footer",
						],
					]}
				/>

				<h2>Example</h2>
				<ComponentExample
					component="Footer"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
				<div
					className="docs-example"
					style={{ padding: 0, overflow: "hidden" }}
				>
					<Footer
						leftSection={
							<span>&copy; 2026 Acme Ltd. All rights reserved.</span>
						}
						rightSection={<a href="/privacy">Privacy policy</a>}
					/>
				</div>
			</div>
		</DocsLayout>
	);
}
