import { Code, Terminal } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

export default function TerminalPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Terminal</h1>
				<p>
					A terminal-style block for displaying shell commands or plain-text
					output. Includes a title bar with traffic-light buttons and a copy
					button.
				</p>

				<h2>Import</h2>
				<Code
					code={"import { Terminal } from '@anephenix/ui';"}
					language="jsx"
				/>
				<h2>Usage</h2>
				<Code
					code={
						'<Terminal title="Install" code="npm i @anephenix/ui --save" />'
					}
					language="jsx"
				/>

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Title shown in the bar above the output"],
						["code", "string", "The text to display"],
					]}
				/>
				<h2>Example</h2>
				<Terminal title="Install" code="npm i @anephenix/ui --save" />
			</div>
		</DocsLayout>
	);
}
