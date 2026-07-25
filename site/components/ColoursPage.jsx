import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const palette = [
	{
		group: "Brand",
		colours: [
			{
				variable: "--primary-colour",
				hex: "#fd5548",
				label: "Primary",
				lightText: true,
				usage: "Error states, destructive actions, primary CTA button",
			},
			{
				variable: "--secondary-colour",
				hex: "#fd9448",
				label: "Secondary",
				lightText: false,
				usage: "Secondary CTA button, accent highlights",
			},
			{
				variable: "--tertiary-colour",
				hex: "#ffc61a",
				label: "Tertiary",
				lightText: false,
				usage: "Warning states, tertiary CTA button",
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
					code={`:root {\n  --primary-colour: #fd5548;\n  --blue-one-colour: #279ae1;\n  /* … */\n}`}
					language="css"
				/>

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
