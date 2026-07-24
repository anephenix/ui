import "./Table.css";

const Table = ({ columns, rows, rowKey = "id", caption, className }) => {
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
						<tr key={row[rowKey]}>
							{columns.map(({ key, render }) => (
								<td key={key}>{render ? render(row[key], row) : row[key]}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
