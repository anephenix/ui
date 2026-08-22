<script lang="ts">
interface TableColumn {
	key: string;
	header: string;
	render?: (value: unknown, row: Record<string, unknown>) => string;
}

interface Props {
	columns: TableColumn[];
	rows: Record<string, unknown>[];
	rowKey?: string;
	caption?: string;
	class?: string;
}

let {
	columns,
	rows,
	rowKey = "id",
	caption,
	class: className,
}: Props = $props();

let classNames = $derived(`table${className ? ` ${className}` : ""}`);
</script>

<div class="table-wrapper">
	<table class={classNames}>
		{#if caption}
			<caption>{caption}</caption>
		{/if}
		<thead>
			<tr>
				{#each columns as { key, header } (key)}
					<th scope="col">{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row[rowKey])}
				<tr>
					{#each columns as { key, render } (key)}
						<td>{render ? render(row[key], row) : (row[key] as string)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
