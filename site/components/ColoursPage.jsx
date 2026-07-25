import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const palette = [
	{
		group: "Brand — Red",
		colours: [
			{
				variable: "--primary-colour",
				hex: "#fd5548",
				label: "Primary",
				lightText: true,
				usage: "Error states, destructive actions, primary CTA button",
			},
			{
				variable: "--primary-two-colour",
				hex: "#ff9187",
				label: "Primary Two",
				lightText: false,
				usage: "Error text in dark mode",
			},
			{
				variable: "--primary-three-colour",
				hex: "#ffd4d0",
				label: "Primary Three",
				lightText: false,
				usage: "Error tints and backgrounds",
			},
		],
	},
	{
		group: "Brand — Orange",
		colours: [
			{
				variable: "--secondary-colour",
				hex: "#fd9448",
				label: "Secondary",
				lightText: false,
				usage: "Secondary CTA button, accent highlights",
			},
			{
				variable: "--secondary-two-colour",
				hex: "#ffb884",
				label: "Secondary Two",
				lightText: false,
				usage: "Lighter orange for dark mode",
			},
			{
				variable: "--secondary-three-colour",
				hex: "#ffe4cc",
				label: "Secondary Three",
				lightText: false,
				usage: "Orange tints and backgrounds",
			},
		],
	},
	{
		group: "Brand — Yellow",
		colours: [
			{
				variable: "--tertiary-colour",
				hex: "#ffc61a",
				label: "Tertiary",
				lightText: false,
				usage: "Warning states, tertiary CTA button",
			},
			{
				variable: "--tertiary-two-colour",
				hex: "#ffd966",
				label: "Tertiary Two",
				lightText: false,
				usage: "Lighter yellow for dark mode",
			},
			{
				variable: "--tertiary-three-colour",
				hex: "#fff3c2",
				label: "Tertiary Three",
				lightText: false,
				usage: "Warning tints and backgrounds",
			},
		],
	},
	{
		group: "Green",
		colours: [
			{
				variable: "--green-one-colour",
				hex: "#69b65c",
				label: "Green One",
				lightText: true,
				usage: "Success states, green-one button variant",
			},
			{
				variable: "--green-two-colour",
				hex: "#95e388",
				label: "Green Two",
				lightText: false,
				usage: "Success text in dark mode, green-two button variant",
			},
			{
				variable: "--green-three-colour",
				hex: "#c5fdbb",
				label: "Green Three",
				lightText: false,
				usage: "Success tints and backgrounds",
			},
		],
	},
	{
		group: "Blue",
		colours: [
			{
				variable: "--blue-one-colour",
				hex: "#279ae1",
				label: "Blue One",
				lightText: true,
				usage: "Info states, links, focus rings, blue-one button variant",
			},
			{
				variable: "--blue-two-colour",
				hex: "#7bccff",
				label: "Blue Two",
				lightText: false,
				usage: "Info text in dark mode, blue-two button variant",
			},
			{
				variable: "--blue-three-colour",
				hex: "#c8eaff",
				label: "Blue Three",
				lightText: false,
				usage: "Info tints and backgrounds",
			},
		],
	},
	{
		group: "Teal",
		colours: [
			{
				variable: "--teal-one-colour",
				hex: "#1aa89e",
				label: "Teal One",
				lightText: true,
				usage: "Bridges green and blue; useful for neutral tags and accents",
			},
			{
				variable: "--teal-two-colour",
				hex: "#5dd4cc",
				label: "Teal Two",
				lightText: false,
				usage: "Lighter teal for dark mode text",
			},
			{
				variable: "--teal-three-colour",
				hex: "#b8f0ed",
				label: "Teal Three",
				lightText: false,
				usage: "Teal tints and backgrounds",
			},
		],
	},
	{
		group: "Purple",
		colours: [
			{
				variable: "--purple-one-colour",
				hex: "#8b44d4",
				label: "Purple One",
				lightText: true,
				usage: "Tags, pricing tiers, creative accents",
			},
			{
				variable: "--purple-two-colour",
				hex: "#b88aff",
				label: "Purple Two",
				lightText: false,
				usage: "Lighter purple for dark mode text",
			},
			{
				variable: "--purple-three-colour",
				hex: "#e5d4ff",
				label: "Purple Three",
				lightText: false,
				usage: "Purple tints and backgrounds",
			},
		],
	},
	{
		group: "Pink",
		colours: [
			{
				variable: "--pink-one-colour",
				hex: "#e8389e",
				label: "Pink One",
				lightText: true,
				usage: "Highlights, social features, promotional accents",
			},
			{
				variable: "--pink-two-colour",
				hex: "#ff80c4",
				label: "Pink Two",
				lightText: false,
				usage: "Lighter pink for dark mode text",
			},
			{
				variable: "--pink-three-colour",
				hex: "#ffd4ec",
				label: "Pink Three",
				lightText: false,
				usage: "Pink tints and backgrounds",
			},
		],
	},
	{
		group: "Neutrals",
		colours: [
			{
				variable: "--light",
				hex: "#ffffff",
				label: "Light",
				lightText: false,
				usage: "Page background, card backgrounds, button text on dark",
				border: true,
			},
			{
				variable: "--dark",
				hex: "#111111",
				label: "Dark",
				lightText: true,
				usage: "Body text, dark mode page background",
			},
			{
				variable: "--form-field-border-colour",
				hex: "#cfcfcf",
				label: "Form Border",
				lightText: false,
				usage: "Input borders, card borders, dividers",
			},
			{
				variable: "--form-field-colour",
				hex: "#414141",
				label: "Form Text",
				lightText: true,
				usage: "Input text, label text",
			},
		],
	},
];

const variantMap = [
	{
		variant: "error",
		variable: "--primary-colour",
		hex: "#fd5548",
		components: "Alert, Badge, Toast, ProgressBar",
	},
	{
		variant: "warning",
		variable: "--tertiary-colour",
		hex: "#ffc61a",
		components: "Alert, Badge, Toast, ProgressBar",
	},
	{
		variant: "success",
		variable: "--green-one-colour",
		hex: "#69b65c",
		components: "Alert, Badge, Toast, ProgressBar",
	},
	{
		variant: "info",
		variable: "--blue-one-colour",
		hex: "#279ae1",
		components: "Alert, Badge, Toast, ProgressBar",
	},
];

const buttonClasses = [
	{ className: "primary", variable: "--primary-colour", hex: "#fd5548" },
	{ className: "secondary", variable: "--secondary-colour", hex: "#fd9448" },
	{ className: "tertiary", variable: "--tertiary-colour", hex: "#ffc61a" },
	{ className: "green-one", variable: "--green-one-colour", hex: "#69b65c" },
	{ className: "green-two", variable: "--green-two-colour", hex: "#95e388" },
	{ className: "blue-one", variable: "--blue-one-colour", hex: "#279ae1" },
	{ className: "blue-two", variable: "--blue-two-colour", hex: "#7bccff" },
];

const swatchStyle = (hex, lightText, border) => ({
	background: hex,
	color: lightText ? "#fff" : "#111",
	border: border ? "1px solid #e0e0e0" : "none",
	borderRadius: "6px",
	padding: "1rem",
	minHeight: "80px",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-end",
	fontFamily: '"Menlo", "Monaco", monospace',
	fontSize: "11px",
});

const dotStyle = (hex) => ({
	display: "inline-block",
	width: "12px",
	height: "12px",
	borderRadius: "50%",
	background: hex,
	border: "1px solid rgba(0,0,0,0.1)",
	flexShrink: 0,
});

export default function ColoursPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Colours</h1>
				<p>
					All colours are defined as CSS custom properties on <code>:root</code>{" "}
					and imported via <code>dist/index.css</code>. Components consume them
					directly — you can override any variable in your own stylesheet to
					theme the system.
				</p>
				<Code
					code={`:root {\n  --primary-colour:        #fd5548;\n  --primary-two-colour:    #ff9187;\n  --primary-three-colour:  #ffd4d0;\n  /* … */\n}`}
					language="css"
				/>

				<p>
					Each hue family follows a three-tier pattern: <strong>one</strong> is
					the saturated base used in components, <strong>two</strong> is lighter
					and suits dark-mode text, and <strong>three</strong> is the lightest
					tint for backgrounds and fills. The brand colours (
					<code>--primary-colour</code>, <code>--secondary-colour</code>,{" "}
					<code>--tertiary-colour</code>) are the original single-value aliases
					and remain unchanged for compatibility.
				</p>

				{palette.map(({ group, colours }) => (
					<div key={group}>
						<h2>{group}</h2>
						<div className="colour-swatch-grid">
							{colours.map(
								({ variable, hex, label, lightText, usage, border }) => (
									<div key={variable} className="colour-swatch">
										<div style={swatchStyle(hex, lightText, border)}>
											<span style={{ fontWeight: 700 }}>{label}</span>
											<span style={{ opacity: 0.85 }}>{hex}</span>
										</div>
										<div className="colour-swatch-meta">
											<code>{variable}</code>
											<p>{usage}</p>
										</div>
									</div>
								),
							)}
						</div>
					</div>
				))}

				<h2>Component variants</h2>
				<p>
					Four semantic variants are used across multiple components. Each maps
					to a CSS custom property.
				</p>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Variant</th>
							<th>CSS variable</th>
							<th>Value</th>
							<th>Used in</th>
						</tr>
					</thead>
					<tbody>
						{variantMap.map(({ variant, variable, hex, components }) => (
							<tr key={variant}>
								<td>
									<span
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: "0.4rem",
										}}
									>
										<span style={dotStyle(hex)} />
										{variant}
									</span>
								</td>
								<td>
									<code>{variable}</code>
								</td>
								<td>
									<code>{hex}</code>
								</td>
								<td>{components}</td>
							</tr>
						))}
					</tbody>
				</table>

				<h2>Button classes</h2>
				<p>
					Button colour variants are applied by combining{" "}
					<code>button theme-default</code> with one of the class names below.
					Append <code>alternate</code> to invert the fill and border.
				</p>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Class</th>
							<th>CSS variable</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{buttonClasses.map(({ className, variable, hex }) => (
							<tr key={className}>
								<td>
									<code>{className}</code>
								</td>
								<td>
									<code>{variable}</code>
								</td>
								<td>
									<span
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: "0.5rem",
										}}
									>
										<span style={dotStyle(hex)} />
										<code>{hex}</code>
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<Code
					code={`<Button text="Save" className="button theme-default primary" />\n<Button text="Save" className="button theme-default primary alternate" />`}
					language="jsx"
				/>
			</div>
		</DocsLayout>
	);
}
