<script lang="ts">
interface Props {
	width?: string | number;
	height?: string | number;
	onclick?: () => void;
}

let { width, height, onclick }: Props = $props();
</script>

<button type="button" id="hamburger" {onclick} data-testid="hamburger">
	<svg
		width={width || "33px"}
		height={height || "26px"}
		viewBox="0 0 33 26"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
	>
		<title>Menu</title>
		<g
			id="hamburger-container"
			stroke="none"
			stroke-width="1"
			fill="none"
			fill-rule="evenodd"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<g
				id="hamburger-layers"
				transform="translate(-328.000000, -19.000000)"
				stroke="#000"
				stroke-width="2"
			>
				<g id="Group" transform="translate(330.000000, 20.000000)">
					<path d="M0.357142857,1 L29.320836,1" id="layer-1"></path>
					<path d="M0.357142857,12 L29.320836,12" id="layer-2"></path>
					<path d="M0.357142857,23 L29.320836,23" id="layer-3"></path>
				</g>
			</g>
		</g>
	</svg>
</button>
