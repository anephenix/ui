import { Code } from "../../dist/index.js";
import DocsLayout from "./DocsLayout.jsx";

const spacers = [
	{ name: "--grid-base", variable: "--spacer-one", px: 8, label: "Base / One" },
	{ name: "--spacer-two", variable: "--spacer-two", px: 16, label: "Two" },
	{
		name: "--spacer-three",
		variable: "--spacer-three",
		px: 24,
		label: "Three",
	},
	{ name: "--spacer-four", variable: "--spacer-four", px: 32, label: "Four" },
	{ name: "--spacer-five", variable: "--spacer-five", px: 40, label: "Five" },
];

const breakpoints = [
	{
		name: "Mobile",
		rule: "< 480px",
		container: "100% (centred)",
		notes: "Full width, items centred",
	},
	{
		name: "Small",
		rule: "481px – 768px",
		container: "100%",
		notes: "Full width",
	},
	{
		name: "Medium",
		rule: "769px – 1024px",
		container: "760px",
		notes: "Fixed container",
	},
	{
		name: "Large",
		rule: "1025px – 1279px",
		container: "1024px",
		notes: "Fixed container",
	},
	{
		name: "Extra-large",
		rule: "≥ 1280px",
		container: "1200px",
		notes: "Wider fixed container for large desktop screens",
	},
];

export default function GridPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Grid</h1>
				<p>
					The design system is built on an 8px base grid. All spacing — padding,
					margins, gaps — uses multiples of this unit, exposed as CSS custom
					properties on <code>:root</code>.
				</p>

				<h2>Spacing scale</h2>
				<p>
					Five named spacers cover the most common spacing needs. Use them
					directly in CSS via the custom property, or rely on components that
					already consume them internally.
				</p>

				<div className="grid-spacer-list">
					{spacers.map(({ name, px, label }) => (
						<div key={name} className="grid-spacer-row">
							<div className="grid-spacer-label">
								<code>{name}</code>
								<span className="grid-spacer-px">{px}px</span>
							</div>
							<div className="grid-spacer-bar" style={{ width: px * 3 }} />
							<span className="grid-spacer-name">{label}</span>
						</div>
					))}
				</div>

				<Code
					code={`:root {\n  --grid-base:    8px;\n  --spacer-one:   8px;\n  --spacer-two:   16px;\n  --spacer-three: 24px;\n  --spacer-four:  32px;\n  --spacer-five:  40px;\n}`}
					language="css"
				/>

				<h2>Usage</h2>
				<p>
					Reference the variables anywhere in your own CSS to stay aligned with
					the grid:
				</p>
				<Code
					code={`.my-card {\n  padding: var(--spacer-two);\n  gap: var(--spacer-one);\n  margin-bottom: var(--spacer-three);\n}`}
					language="css"
				/>

				<h2>Breakpoints</h2>
				<p>
					Four named breakpoints drive the responsive container widths. These
					are defined in <code>grid.css</code> and applied to the{" "}
					<code>.container</code> class.
				</p>
				<table className="prop-table">
					<thead>
						<tr>
							<th>Breakpoint</th>
							<th>Screen width</th>
							<th>Container width</th>
							<th>Notes</th>
						</tr>
					</thead>
					<tbody>
						{breakpoints.map(({ name, rule, container, notes }) => (
							<tr key={name}>
								<td>
									<strong>{name}</strong>
								</td>
								<td>
									<code>{rule}</code>
								</td>
								<td>{container}</td>
								<td>{notes}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</DocsLayout>
	);
}
