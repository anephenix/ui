<script lang="ts">
const COLOURS = [
	"#fd5548",
	"#fd9448",
	"#ffc61a",
	"#69b65c",
	"#279ae1",
	"#7bccff",
	"#95e388",
];

function getInitials(name: string): string {
	return name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => word[0].toUpperCase())
		.join("");
}

function getColour(name: string): string {
	let hash = 0;
	for (const char of name) {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	}
	return COLOURS[Math.abs(hash) % COLOURS.length];
}

interface Props {
	src?: string;
	alt?: string;
	name?: string;
	size?: string;
	shape?: string;
	class?: string;
}

let {
	src,
	alt,
	name,
	size = "md",
	shape = "circle",
	class: className,
}: Props = $props();

let imgError = $state(false);

let classNames = $derived(
	`avatar avatar-${size} avatar-${shape}${className ? ` ${className}` : ""}`,
);
</script>

{#if src && !imgError}
	<div class={classNames}>
		<img
			{src}
			alt={alt ?? name ?? "Avatar"}
			class="avatar-img"
			onerror={() => (imgError = true)}
		/>
	</div>
{:else if name}
	{@const initials = getInitials(name)}
	{@const bgColour = getColour(name)}
	<div
		role="img"
		class={classNames}
		style="background-color: {bgColour}"
		aria-label={name}
		title={name}
	>
		<span class="avatar-initials" aria-hidden="true">{initials}</span>
	</div>
{:else}
	<div role="img" class={classNames} aria-label={alt ?? "User avatar"} title={alt ?? "User avatar"}>
		<svg class="avatar-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path
				d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.338 0-10 1.676-10 5v1h20v-1c0-3.324-6.662-5-10-5z"
			/>
		</svg>
	</div>
{/if}
