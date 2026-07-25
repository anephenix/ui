import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const fontStack = `"Helvetica Neue", -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", sans-serif`;

const headings = [
	{ tag: "h1", size: "36px", weight: "700", className: "theme-default" },
	{ tag: "h2", size: "28px", weight: "700", className: "theme-default" },
	{ tag: "h3", size: "24px", weight: "700", className: "theme-default" },
	{ tag: "h4", size: "18px", weight: "700", className: "theme-default" },
];

const textStyles = [
	{
		label: "Body",
		size: "14px",
		weight: "400",
		family: "System sans-serif stack",
		sample: "The quick brown fox jumps over the lazy dog.",
	},
	{
		label: "Monospace",
		size: "14px",
		weight: "400",
		family: '"Menlo", "Monaco", "Courier New", monospace',
		sample: "const colours = ['red', 'green', 'blue'];",
		mono: true,
	},
];

const headingCss = `.theme-default h1 { font-size: 36px; font-weight: 700; }
.theme-default h2 { font-size: 28px; font-weight: 700; }
.theme-default h3 { font-size: 24px; font-weight: 700; }
.theme-default h4 { font-size: 18px; font-weight: 700; }`;

export default function TypographyPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Typography</h1>
				<p>
					The design system uses a system sans-serif font stack for all UI text
					and a monospace stack for code elements. Heading sizes are defined
					under the <code>.theme-default</code> scope in{" "}
					<code>typography.css</code>.
				</p>

				<h2>Font families</h2>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Role</th>
							<th>Stack</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Body / UI</td>
							<td>
								<code style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
									{fontStack}
								</code>
							</td>
						</tr>
						<tr>
							<td>Code</td>
							<td>
								<code>{'"Menlo", "Monaco", "Courier New", monospace'}</code>
							</td>
						</tr>
					</tbody>
				</table>

				<h2>Heading scale</h2>
				<p>
					Heading sizes are scoped to <code>.theme-default</code> so they only
					apply where the design system is explicitly opted in, avoiding
					conflicts with host-app resets.
				</p>
				<Code code={headingCss} language="css" />

				<div className="typography-scale">
					{headings.map(({ tag: Tag, size, weight }) => (
						<div key={Tag} className="typography-scale-row">
							<span className="typography-scale-meta">
								<code>{`<${Tag}>`}</code>
								<span>
									{size} / {weight}
								</span>
							</span>
							<Tag
								className="theme-default"
								style={{ margin: 0, lineHeight: 1.2 }}
							>
								The quick brown fox
							</Tag>
						</div>
					))}
				</div>

				<h2>Body text</h2>
				<p>
					Body text defaults to 14px with the system sans-serif stack. The base
					font settings are applied globally in{" "}
					<code>design-system/index.css</code>.
				</p>

				<div className="typography-samples">
					{textStyles.map(({ label, size, weight, family, sample, mono }) => (
						<div key={label} className="typography-sample">
							<div className="typography-sample-meta">
								<strong>{label}</strong>
								<span>
									{size} · {weight} ·{" "}
									<code style={{ fontSize: "0.8em" }}>{family}</code>
								</span>
							</div>
							<p
								style={{
									fontFamily: mono
										? '"Menlo", "Monaco", "Courier New", monospace'
										: undefined,
									fontSize: size,
									fontWeight: weight,
									margin: 0,
								}}
							>
								{sample}
							</p>
						</div>
					))}
				</div>

				<h2>Smoothing</h2>
				<p>
					<code>-webkit-font-smoothing: antialiased</code> is applied globally
					on <code>body</code> for crisper rendering on macOS and iOS.
				</p>
			</div>
		</DocsLayout>
	);
}
