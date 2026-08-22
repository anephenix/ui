const STORAGE_KEY = "theme";

export function getStoredTheme() {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === "light" || value === "dark" ? value : null;
	} catch {
		return null;
	}
}

export function getEffectiveTheme() {
	const stored = getStoredTheme();
	if (stored) return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function applyTheme(theme) {
	document.documentElement.setAttribute("data-theme", theme);
}

export function setTheme(theme) {
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// localStorage unavailable (private browsing, disabled) — theme
		// still applies for this page load, just won't persist.
	}
	applyTheme(theme);
	window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}
