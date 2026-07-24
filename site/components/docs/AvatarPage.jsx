import { Avatar, Code } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const usageSnippet = `// Image
<Avatar src="/photo.jpg" alt="Alice Brown" />

// Initials fallback (no image)
<Avatar name="Alice Brown" />

// Icon fallback (no image or name)
<Avatar />

// Custom size and shape
<Avatar name="Bob Smith" size="lg" shape="rounded" />`;

const sizes = ["sm", "md", "lg", "xl"];
const shapes = ["circle", "rounded", "square"];

const people = [
	{ name: "Alice Brown", src: null },
	{ name: "Bob Smith", src: null },
	{ name: "Carol White", src: null },
	{ name: "Dan Park", src: null },
	{ name: "Eva Müller", src: null },
];

export default function AvatarPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Avatar</h1>
				<p>
					A user profile picture with three automatic states: a photo when{" "}
					<code>src</code> is provided, initials derived from <code>name</code>{" "}
					when no image is available, and a generic icon fallback when neither
					is set. The initials background colour is consistently derived from
					the name so the same person always gets the same colour.
				</p>

				<h2>Import</h2>
				<Code code={"import { Avatar } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"src",
							"string",
							"Image URL. Falls back to initials or icon if omitted or if the image fails to load",
						],
						[
							"alt",
							"string",
							"Alt text for the image. Defaults to name if provided",
						],
						[
							"name",
							"string",
							"Used to generate initials and a consistent background colour",
						],
						[
							"size",
							'"sm" | "md" | "lg" | "xl"',
							'Avatar diameter. Defaults to "md"',
						],
						[
							"shape",
							'"circle" | "rounded" | "square"',
							'Border radius style. Defaults to "circle"',
						],
						["className", "string", "Optional additional CSS class"],
					]}
				/>

				<h2>Example</h2>

				<h3>Initials — sizes</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "1rem" }}
				>
					{sizes.map((s) => (
						<Avatar key={s} name="Alice Brown" size={s} />
					))}
				</div>

				<h3>Shapes</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "1rem" }}
				>
					{shapes.map((sh) => (
						<Avatar key={sh} name="Alice Brown" size="lg" shape={sh} />
					))}
				</div>

				<h3>Multiple users — consistent colours</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
				>
					{people.map(({ name }) => (
						<Avatar key={name} name={name} />
					))}
				</div>

				<h3>Icon fallback</h3>
				<div
					className="docs-example"
					style={{ display: "flex", alignItems: "center", gap: "1rem" }}
				>
					{sizes.map((s) => (
						<Avatar key={s} size={s} />
					))}
				</div>
			</div>
		</DocsLayout>
	);
}
