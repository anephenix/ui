import { useState } from "react";

export function LivePreview({ component, svelte = true }) {
	const [framework, setFramework] = useState("react");
	const src = `/preview?component=${component}&framework=${framework}`;

	return (
		<div className="live-preview">
			{svelte && (
				<div className="live-preview-toggle">
					<button
						type="button"
						className={framework === "react" ? "active" : ""}
						onClick={() => setFramework("react")}
					>
						React
					</button>
					<button
						type="button"
						className={framework === "svelte" ? "active" : ""}
						onClick={() => setFramework("svelte")}
					>
						Svelte
					</button>
				</div>
			)}
			<iframe
				src={src}
				title={`${component} live preview (${framework})`}
				className="live-preview-frame"
			/>
		</div>
	);
}

export default LivePreview;
