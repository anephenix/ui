import { Code, Tabs } from "@anephenix/ui";
import { useEffect, useState } from "react";
import { getEffectiveTheme } from "../../scripts/theme.js";

export function ComponentExample({ component, reactCode, svelteCode }) {
	const [framework, setFramework] = useState("react");
	const [theme, setTheme] = useState(getEffectiveTheme);
	const code = framework === "react" ? reactCode : svelteCode;
	const ext = framework === "react" ? "jsx" : "svelte";

	useEffect(() => {
		const onThemeChange = (e) => setTheme(e.detail.theme);
		window.addEventListener("themechange", onThemeChange);
		return () => window.removeEventListener("themechange", onThemeChange);
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
								src={`/preview?component=${component}&framework=${framework}&embed=1&theme=${theme}`}
								title={`${component} live preview (${framework})`}
								className="live-preview-frame"
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
