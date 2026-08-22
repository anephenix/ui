import { Code, Tabs } from "@anephenix/ui";
import { useEffect, useRef, useState } from "react";
import { getEffectiveTheme } from "../../scripts/theme.js";

const MIN_FRAME_HEIGHT = 120;
const MAX_FRAME_HEIGHT = 640;

export function ComponentExample({ component, reactCode, svelteCode }) {
	const [framework, setFramework] = useState("react");
	const [theme, setTheme] = useState(getEffectiveTheme);
	const [frameHeight, setFrameHeight] = useState(MIN_FRAME_HEIGHT);
	const iframeRef = useRef(null);
	const code = framework === "react" ? reactCode : svelteCode;
	const ext = framework === "react" ? "jsx" : "svelte";

	useEffect(() => {
		const onThemeChange = (e) => setTheme(e.detail.theme);
		window.addEventListener("themechange", onThemeChange);
		return () => window.removeEventListener("themechange", onThemeChange);
	}, []);

	// The preview iframe is same-origin (served from /preview), so its
	// content height can be measured directly and used to size the iframe
	// to fit — a fixed height leaves a lot of empty space for small
	// components and clips taller ones.
	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;
		let observer;

		const measure = () => {
			try {
				const height = iframe.contentWindow.document.body.scrollHeight;
				setFrameHeight(
					Math.min(Math.max(height, MIN_FRAME_HEIGHT), MAX_FRAME_HEIGHT),
				);
			} catch {
				// Cross-origin or navigation still in progress.
			}
		};

		const onLoad = () => {
			observer?.disconnect();
			measure();
			try {
				observer = new ResizeObserver(measure);
				observer.observe(iframe.contentWindow.document.body);
			} catch {
				// ResizeObserver unavailable, or the frame isn't accessible.
			}
		};

		iframe.addEventListener("load", onLoad);
		return () => {
			iframe.removeEventListener("load", onLoad);
			observer?.disconnect();
		};
	}, []);

	return (
		<div className="component-example">
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
			<Tabs
				defaultTab="preview"
				tabs={[
					{
						id: "preview",
						label: "Preview",
						content: (
							<iframe
								ref={iframeRef}
								src={`/preview?component=${component}&framework=${framework}&embed=1&theme=${theme}`}
								title={`${component} live preview (${framework})`}
								className="live-preview-frame"
								style={{ height: frameHeight }}
							/>
						),
					},
					{
						id: "code",
						label: "Code",
						content: (
							<div className="example-component-code">
								<Code
									code={code}
									language={ext}
									title={`${component}.${ext}`}
								/>
							</div>
						),
					},
				]}
			/>
		</div>
	);
}

export default ComponentExample;
