import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import Table from "./Table.svelte";

const columns = [
	{ key: "name", header: "Name" },
	{ key: "role", header: "Role" },
	{ key: "status", header: "Status" },
];

const rows = [
	{ id: 1, name: "Alice Chen", role: "Engineer", status: "active" },
	{ id: 2, name: "Bob Smith", role: "Designer", status: "inactive" },
	{ id: 3, name: "Carol White", role: "Manager", status: "active" },
];

describe("Table", () => {
	test("renders all column headers", () => {
		render(Table, { props: { columns, rows } });
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Role")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();
	});

	test("renders all row data", () => {
		render(Table, { props: { columns, rows } });
		expect(screen.getByText("Alice Chen")).toBeInTheDocument();
		expect(screen.getByText("Bob Smith")).toBeInTheDocument();
		expect(screen.getByText("Carol White")).toBeInTheDocument();
	});

	test("renders the correct number of rows", () => {
		const { container } = render(Table, { props: { columns, rows } });
		const bodyRows = container.querySelectorAll("tbody tr");
		expect(bodyRows).toHaveLength(3);
	});

	test("renders the correct number of columns per row", () => {
		const { container } = render(Table, { props: { columns, rows } });
		const firstRowCells = container.querySelectorAll("tbody tr:first-child td");
		expect(firstRowCells).toHaveLength(3);
	});

	test("uses a custom render function for a column", () => {
		const columnsWithRender = [
			...columns.slice(0, 2),
			{
				key: "status",
				header: "Status",
				render: (value: unknown) => (value as string).toUpperCase(),
			},
		];
		const { container } = render(Table, {
			props: { columns: columnsWithRender, rows },
		});
		const cells = container.querySelectorAll("tbody tr td:last-child");
		expect(cells).toHaveLength(3);
		expect(cells[0]).toHaveTextContent("ACTIVE");
		expect(cells[1]).toHaveTextContent("INACTIVE");
	});

	test("passes the full row to the render function", () => {
		const renderFn = vi.fn(
			(_value: unknown, row: Record<string, unknown>) => row.name as string,
		);
		const columnsWithRender = [
			{ key: "status", header: "Status", render: renderFn },
		];
		render(Table, { props: { columns: columnsWithRender, rows: [rows[0]] } });
		expect(renderFn).toHaveBeenCalledWith("active", rows[0]);
	});

	test("renders the caption when provided", () => {
		render(Table, { props: { columns, rows, caption: "Team members" } });
		expect(screen.getByText("Team members")).toBeInTheDocument();
	});

	test("does not render a caption element when caption is omitted", () => {
		const { container } = render(Table, { props: { columns, rows } });
		expect(container.querySelector("caption")).not.toBeInTheDocument();
	});

	test("applies an additional class to the table", () => {
		const { container } = render(Table, {
			props: { columns, rows, class: "custom-class" },
		});
		expect(container.querySelector("table")).toHaveClass(
			"table",
			"custom-class",
		);
	});

	test("uses a custom rowKey field for row identity", () => {
		const rowsWithSlug = [
			{ slug: "alice", name: "Alice", role: "Engineer", status: "active" },
			{ slug: "bob", name: "Bob", role: "Designer", status: "inactive" },
		];
		const { container } = render(Table, {
			props: { columns, rows: rowsWithSlug, rowKey: "slug" },
		});
		expect(container.querySelectorAll("tbody tr")).toHaveLength(2);
	});

	test("renders an empty tbody when rows is empty", () => {
		const { container } = render(Table, { props: { columns, rows: [] } });
		const bodyRows = container.querySelectorAll("tbody tr");
		expect(bodyRows).toHaveLength(0);
	});

	test("column headers use scope=col for accessibility", () => {
		const { container } = render(Table, { props: { columns, rows } });
		const headers = container.querySelectorAll("th");
		for (const th of headers) {
			expect(th).toHaveAttribute("scope", "col");
		}
	});
});
