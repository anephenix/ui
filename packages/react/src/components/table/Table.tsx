import "@anephenix/ui-tokens/components/table/Table.css";

interface TableColumn {
	key: string;
	header: string;
	render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableProps {
	columns: TableColumn[];
	rows: Record<string, unknown>[];
	rowKey?: string;
	caption?: string;
	className?: string;
}

const Table = ({
	columns,
	rows,
	rowKey = "id",
	caption,
	className,
}: TableProps) => {
	const classNames = `table${className ? ` ${className}` : ""}`;
	return (
		<div className="table-wrapper">
			<table className={classNames}>
				{caption && <caption>{caption}</caption>}
				<thead>
					<tr>
						{columns.map(({ key, header }) => (
							<th key={key} scope="col">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr key={row[rowKey] as string}>
							{columns.map(({ key, render }) => (
								<td key={key}>
									{render
										? render(row[key], row)
										: (row[key] as React.ReactNode)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
