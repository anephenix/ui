import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const __dirname = new URL(".", import.meta.url).pathname;
// Updates CHANGELOG.md with the latest version and commit messages.
//
// Adapted from packages/react/scripts/update-changelog.ts: this package's git
// tags are prefixed "svelte-v" (e.g. svelte-v0.1.0), not the bare "vX.Y.Z"
// React's tags use, since both packages share one git history and a shared
// prefix would collide. Requires at least one prior svelte-v tag to exist —
// safe to run starting with the second release; the first release's entry
// was written by hand in CHANGELOG.md.

// Paths
const packageJsonPath = join(__dirname, "../package.json");
const changelogPath = join(__dirname, "../CHANGELOG.md");

// Get current version from package.json
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const currentVersion = packageJson.version;

// Bump patch version
const [major, minor, patch] = currentVersion.split(".").map(Number);
const nextVersion = `${major}.${minor}.${patch + 1}`;

// Get previous version from this package's own git tags
const previousVersion = execSync(
	'git describe --tags --abbrev=0 --match "svelte-v*" HEAD^',
)
	.toString()
	.trim();

// Get commit messages between previous version and current version
const commitMessages = execSync(
	`git log ${previousVersion}..HEAD --pretty=format:"- %s" -- packages/svelte`,
)
	.toString()
	.trim();

// Get current date
function getOrdinalSuffix(day: number): string {
	if (day > 3 && day < 21) return "th"; // Covers 11th to 19th
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

function formatDateToString(): string {
	const days: string[] = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const today: Date = new Date();
	const dayName: string = days[today.getDay()];
	const day: number = today.getDate();
	const monthName: string = months[today.getMonth()];
	const year: number = today.getFullYear();

	const ordinalSuffix: string = getOrdinalSuffix(day);

	return `${dayName} ${day}${ordinalSuffix} ${monthName}, ${year}`;
}

const currentDate = formatDateToString();

// Read current CHANGELOG.md content
const changelogContent = readFileSync(changelogPath, "utf-8");

// Create new changelog entry
const newChangelogEntry = `### ${nextVersion} - ${currentDate}

${commitMessages}
`;

// Insert new changelog entry at the top
const changelogLines = changelogContent.split("\n");
changelogLines.splice(2, 0, newChangelogEntry);
const updatedChangelogContent = changelogLines.join("\n");

// Save updated CHANGELOG.md
writeFileSync(changelogPath, updatedChangelogContent, "utf-8");

console.log("CHANGELOG.md updated successfully.");
