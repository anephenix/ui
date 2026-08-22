export const PropTable = ({ rows }) => (
	<table className="prop-table">
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			{rows.map(([prop, type, desc]) => (
				<tr key={prop}>
					<td>
						<code>{prop}</code>
					</td>
					<td>{type}</td>
					<td>{desc}</td>
				</tr>
			))}
		</tbody>
	</table>
);
