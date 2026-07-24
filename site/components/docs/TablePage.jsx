import { Code, Table } from "../../../dist/index.js";
import DocsLayout from "../DocsLayout.jsx";
import { PropTable } from "./shared.jsx";

const columns = [
	{ key: "name", header: "Name" },
	{ key: "role", header: "Role" },
	{
		key: "status",
		header: "Status",
		render: (value) => (
			<span
				style={{
					fontWeight: 600,
					color: value === "Active" ? "var(--green-one-colour)" : "#999",
				}}
			>
				{value}
			</span>
		),
	},
	{ key: "joined", header: "Joined" },
];

const rows = [
	{
		id: 1,
		name: "Alice Chen",
		role: "Engineer",
		status: "Active",
		joined: "Jan 2023",
	},
	{
		id: 2,
		name: "Bob Smith",
		role: "Designer",
		status: "Active",
		joined: "Mar 2023",
	},
	{
		id: 3,
		name: "Carol White",
		role: "Manager",
		status: "Inactive",
		joined: "Nov 2022",
	},
	{
		id: 4,
		name: "Dan Park",
		role: "Engineer",
		status: "Active",
		joined: "Jun 2024",
	},
];

const usageSnippet = `const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  {
    key: 'status',
    header: 'Status',
    render: (value) => (
      <span style={{ color: value === 'Active' ? 'green' : 'grey' }}>
        {value}
      </span>
    ),
  },
];

const rows = [
  { id: 1, name: 'Alice Chen', role: 'Engineer', status: 'Active' },
  { id: 2, name: 'Bob Smith',  role: 'Designer', status: 'Inactive' },
];

<Table columns={columns} rows={rows} caption="Team members" />`;

export default function TablePage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>Table</h1>
				<p>
					A data table that accepts column definitions and row objects. Columns
					support an optional <code>render</code> function for custom cell
					content. Horizontally scrollable on small screens.
				</p>

				<h2>Import</h2>
				<Code code={"import { Table } from '@anephenix/ui';"} language="jsx" />

				<h2>Usage</h2>
				<Code code={usageSnippet} language="jsx" />

				<h2>Props</h2>
				<PropTable
					rows={[
						[
							"columns",
							"array",
							"Array of column definition objects — see shape below",
						],
						["rows", "array", "Array of row data objects"],
						[
							"rowKey",
							"string",
							'Field name used as the React key for each row. Defaults to "id"',
						],
						[
							"caption",
							"string",
							"Optional accessible caption rendered above the table",
						],
						[
							"className",
							"string",
							"Optional additional CSS class on the <table> element",
						],
					]}
				/>

				<h2>Column shape</h2>
				<PropTable
					rows={[
						[
							"key",
							"string",
							"Field name from the row object to display in this column",
						],
						["header", "string", "Column header label"],
						[
							"render",
							"function",
							"Optional (value, row) => node — custom cell renderer",
						],
					]}
				/>

				<h2>Example</h2>
				<div className="docs-example">
					<Table columns={columns} rows={rows} caption="Team members" />
				</div>
			</div>
		</DocsLayout>
	);
}
