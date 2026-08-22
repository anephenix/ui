<script lang="ts">
interface BreadcrumbItem {
	href?: string;
	label: string;
}

interface Props {
	items: BreadcrumbItem[];
	separator?: string;
	class?: string;
}

let { items, separator = "/", class: className }: Props = $props();

let classNames = $derived(`breadcrumb${className ? ` ${className}` : ""}`);
</script>

<nav aria-label="Breadcrumb">
	<ol class={classNames}>
		{#each items as item, index (item.href ?? item.label)}
			<li class="breadcrumb-item">
				{#if index > 0}
					<span class="breadcrumb-separator" aria-hidden="true">{separator}</span>
				{/if}
				{#if item.href}
					<a href={item.href} class="breadcrumb-link">{item.label}</a>
				{:else}
					<span class="breadcrumb-current" aria-current="page">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
