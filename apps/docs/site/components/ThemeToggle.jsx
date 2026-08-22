import { useState } from "react";
import { getEffectiveTheme, setTheme } from "../scripts/theme.js";

export default function ThemeToggle() {
	const [theme, setThemeState] = useState(getEffectiveTheme);
	const next = theme === "dark" ? "light" : "dark";

	return (
		<button
			type="button"
			className="theme-toggle"
			aria-label={`Switch to ${next} mode`}
			title={`Switch to ${next} mode`}
			onClick={() => {
				setTheme(next);
				setThemeState(next);
			}}
		>
			{theme === "dark" ? "🌙" : "☀️"}
		</button>
	);
}
