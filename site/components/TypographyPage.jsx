import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const fontStack = `"Helvetica Neue", -apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", sans-serif`;

const fontSizes = [
	{
		variable: "--font-size-xs",
		value: "11px",
		usage: "Small labels, badges, metadata",
	},
	{
		variable: "--font-size-sm",
		value: "12px",
		usage: "Captions, h6, timestamps",
	},
	{
		variable: "--font-size-base",
		value: "14px",
		usage: "Body text (applied to body globally)",
	},
	{
		variable: "--font-size-md",
		value: "16px",
		usage: "h5, slightly larger UI text",
	},
	{ variable: "--font-size-lg", value: "18px", usage: "h4, lead paragraphs" },
	{ variable: "--font-size-xl", value: "24px", usage: "h3" },
	{ variable: "--font-size-2xl", value: "28px", usage: "h2" },
	{ variable: "--font-size-3xl", value: "36px", usage: "h1" },
];

const fontWeights = [
	{ variable: "--font-weight-normal", value: "400", usage: "Body text" },
	{
		variable: "--font-weight-medium",
		value: "500",
		usage: "Emphasis, UI labels",
	},
	{ variable: "--font-weight-semibold", value: "600", usage: "h3, h4, h5" },
	{
		variable: "--font-weight-bold",
		value: "700",
		usage: "h1, h2, h6, strong text",
	},
];

const lineHeights = [
	{
		variable: "--line-height-tight",
		value: "1.15",
		usage: "h1, h2 — large headings need tight leading",
	},
	{
		variable: "--line-height-snug",
		value: "1.3",
		usage: "h3–h6, compact UI text",
	},
	{
		variable: "--line-height-normal",
		value: "1.5",
		usage: "Short paragraphs, UI descriptions",
	},
	{
		variable: "--line-height-relaxed",
		value: "1.6",
		usage: "Body text (applied to body globally)",
	},
];

const headings = [
	{
		tag: "h1",
		size: "--font-size-3xl (36px)",
		weight: "--font-weight-bold (700)",
		lineHeight: "--line-height-tight (1.15)",
		letterSpacing: "-0.02em",
	},
	{
		tag: "h2",
		size: "--font-size-2xl (28px)",
		weight: "--font-weight-bold (700)",
		lineHeight: "--line-height-tight (1.15)",
		letterSpacing: "-0.015em",
	},
	{
		tag: "h3",
		size: "--font-size-xl (24px)",
		weight: "--font-weight-semibold (600)",
		lineHeight: "--line-height-snug (1.3)",
		letterSpacing: "-0.01em",
	},
	{
		tag: "h4",
		size: "--font-size-lg (18px)",
		weight: "--font-weight-semibold (600)",
		lineHeight: "--line-height-snug (1.3)",
		letterSpacing: "none",
	},
	{
		tag: "h5",
		size: "--font-size-md (16px)",
		weight: "--font-weight-semibold (600)",
		lineHeight: "--line-height-snug (1.3)",
		letterSpacing: "none",
	},
	{
		tag: "h6",
		size: "--font-size-sm (12px)",
		weight: "--font-weight-bold (700)",
		lineHeight: "--line-height-snug (1.3)",
		letterSpacing: "0.06em + uppercase",
	},
];

const tokenSnippet = `:root {
  --font-size-base: 14px;
  --font-size-3xl:  36px;

  --font-weight-semibold: 600;
  --font-weight-bold:     700;

  --line-height-tight:   1.15;
  --line-height-relaxed: 1.6;
}`;

const usageSnippet = `.page-title {
  font-size:   var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.caption {
  font-size:   var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}`;

export default function TypographyPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Typography</h1>
				<p>
					The design system exposes its type scale, weights, and line heights as
					CSS custom properties so you can use them consistently across your own
					styles. Heading rules are scoped to <code>.theme-default</code> to
					avoid conflicts with host-app resets.
				</p>
				<Code code={tokenSnippet} language="css" />

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

				<h2>Font size scale</h2>
				<p>
					Eight steps from <code>11px</code> to <code>36px</code>. Use the
					variables in your own CSS rather than hardcoding pixel values.
				</p>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Variable</th>
							<th>Value</th>
							<th>Usage</th>
						</tr>
					</thead>
					<tbody>
						{fontSizes.map(({ variable, value, usage }) => (
							<tr key={variable}>
								<td>
									<code>{variable}</code>
								</td>
								<td>
									<span
										style={{
											fontFamily: "monospace",
											fontSize: value,
											lineHeight: 1,
										}}
									>
										{value}
									</span>
								</td>
								<td>{usage}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2>Font weights</h2>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Variable</th>
							<th>Value</th>
							<th>Usage</th>
						</tr>
					</thead>
					<tbody>
						{fontWeights.map(({ variable, value, usage }) => (
							<tr key={variable}>
								<td>
									<code>{variable}</code>
								</td>
								<td>
									<span style={{ fontWeight: Number(value) }}>{value}</span>
								</td>
								<td>{usage}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2>Line heights</h2>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Variable</th>
							<th>Value</th>
							<th>Usage</th>
						</tr>
					</thead>
					<tbody>
						{lineHeights.map(({ variable, value, usage }) => (
							<tr key={variable}>
								<td>
									<code>{variable}</code>
								</td>
								<td>
									<code>{value}</code>
								</td>
								<td>{usage}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2>Heading scale</h2>
				<p>
					All heading rules live under <code>.theme-default</code>. Wrap your
					content in a <code>{'<div className="theme-default">'}</code> to apply
					them.
				</p>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Element</th>
							<th>Size</th>
							<th>Weight</th>
							<th>Line height</th>
							<th>Letter spacing</th>
						</tr>
					</thead>
					<tbody>
						{headings.map(
							({ tag, size, weight, lineHeight, letterSpacing }) => (
								<tr key={tag}>
									<td>
										<code>{`<${tag}>`}</code>
									</td>
									<td>
										<code>{size}</code>
									</td>
									<td>
										<code>{weight}</code>
									</td>
									<td>
										<code>{lineHeight}</code>
									</td>
									<td>
										<code>{letterSpacing}</code>
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>

				<h2>Example</h2>
				<div className="theme-default typography-scale">
					{headings.map(({ tag: Tag }) => (
						<div key={Tag} className="typography-scale-row">
							<span className="typography-scale-meta">
								<code>{`<${Tag}>`}</code>
							</span>
							<Tag style={{ margin: 0 }}>The quick brown fox</Tag>
						</div>
					))}
				</div>

				<h2>Body text</h2>
				<p>
					<code>font-size: var(--font-size-base)</code> and{" "}
					<code>line-height: var(--line-height-relaxed)</code> are applied
					directly on <code>body</code> in <code>design-system/index.css</code>,
					so they take effect globally without any class.
				</p>

				<div className="typography-samples">
					<div className="typography-sample">
						<div className="typography-sample-meta">
							<strong>Body</strong>
							<span>
								14px · 400 · <code>--line-height-relaxed (1.6)</code>
							</span>
						</div>
						<p style={{ margin: 0 }}>
							The quick brown fox jumps over the lazy dog. Pack my box with five
							dozen liquor jugs. How vexingly quick daft zebras jump.
						</p>
					</div>
					<div className="typography-sample">
						<div className="typography-sample-meta">
							<strong>Monospace</strong>
							<span>14px · 400 · Menlo, Monaco, Courier New</span>
						</div>
						<p
							style={{
								margin: 0,
								fontFamily: '"Menlo", "Monaco", "Courier New", monospace',
							}}
						>
							const colours = ['red', 'green', 'blue'];
						</p>
					</div>
				</div>

				<h2>Using the tokens</h2>
				<p>
					Reference any token directly in your own CSS. This keeps your custom
					styles on the same scale as the design system components.
				</p>
				<Code code={usageSnippet} language="css" />

				<h2>Smoothing</h2>
				<p>
					<code>-webkit-font-smoothing: antialiased</code> is applied globally
					on <code>body</code> for crisper rendering on macOS and iOS.
				</p>
			</div>
		</DocsLayout>
	);
}
