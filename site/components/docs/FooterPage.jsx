import { Code, Footer } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const exampleSnippet = `<Footer
  leftSection={<span>&copy; 2026 Acme Ltd.</span>}
  rightSection={<a href="/privacy">Privacy policy</a>}
/>`;

export default function FooterPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Footer</h1>
				<p>
					A two-column footer with a left section and a right section, both
					accepting arbitrary React nodes.
				</p>

				<h2>Import</h2>
				<Code code={"import { Footer } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={exampleSnippet} language="jsx" />

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
