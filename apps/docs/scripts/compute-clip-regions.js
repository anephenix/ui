/**
 * Visits each component preview at the configured viewport size, measures the
 * component element's bounding box, adds padding, and writes clip entries into
 * screenshot-config.json. Run with: npm run compute-clips
 */
import { exec, spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import puppeteer from "puppeteer";

const execAsync = promisify(exec);

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;
const CONFIG_PATH = "scripts/screenshot-config.json";

// Breathing room added around each element's bounding box
const PADDING = 40;
// Minimum clip dimensions — keeps tiny components (Spinner, Badge, etc.) readable
const MIN_W = 400;
const MIN_H = 220;

// Components that need a specific selector rather than the generic .preview-ready > *
const CUSTOM_SELECTORS = {
	Modal: "dialog.modal",
	Toast: ".toast",
};

const COMPONENTS = [
	"Accordion",
	"Alert",
	"Avatar",
	"Badge",
	"Breadcrumb",
	"Button",
	"Card",
	"Checkbox",
	"Code",
	"ComboBox",
	"Divider",
	"Dropdown",
	"Footer",
	"FormField",
	"Hero",
	"Input",
	"Modal",
	"NavBar",
	"Pagination",
	"Popover",
	"ProgressBar",
	"RadioButton",
	"Select",
	"Skeleton",
	"Spinner",
	"Switch",
	"Table",
	"Tabs",
	"Terminal",
	"Textarea",
	"Toast",
	"Tooltip",
];

async function isServerUp() {
	try {
		const res = await fetch(BASE_URL);
		return res.ok;
	} catch {
		return false;
	}
}

async function waitForServer(timeout = 60000) {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		if (await isServerUp()) return;
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error("Dev server did not start in time");
}

function clampAndRound(clip, viewport) {
	const x = Math.max(0, Math.round(clip.x));
	const y = Math.max(0, Math.round(clip.y));
	const width = Math.min(Math.round(clip.width), viewport.width - x);
	const height = Math.min(Math.round(clip.height), viewport.height - y);
	return { x, y, width, height };
}

function boxToClip(box, viewport) {
	let x = box.x - PADDING;
	let y = box.y - PADDING;
	let w = box.width + PADDING * 2;
	let h = box.height + PADDING * 2;

	if (w < MIN_W) {
		x -= (MIN_W - w) / 2;
		w = MIN_W;
	}
	if (h < MIN_H) {
		y -= (MIN_H - h) / 2;
		h = MIN_H;
	}

	return clampAndRound({ x, y, width: w, height: h }, viewport);
}

async function getClip(page, name, viewport) {
	await page.goto(`${BASE_URL}/preview?component=${name}`, {
		waitUntil: "networkidle0",
	});
	await page.waitForSelector(".preview-ready", { timeout: 10000 });
	await new Promise((r) => setTimeout(r, 400));

	const selector = CUSTOM_SELECTORS[name] ?? ".preview-ready > *";
	const el = await page.$(selector);

	if (!el) {
		console.warn(`    ⚠ selector "${selector}" not found — skipping`);
		return null;
	}

	const box = await el.boundingBox();

	if (!box || box.width === 0 || box.height === 0) {
		console.warn(`    ⚠ zero-size bounding box — skipping`);
		return null;
	}

	return boxToClip(box, viewport);
}

async function main() {
	console.log("Building library...");
	await execAsync("node build.js");
	console.log("Library built.");

	let server = null;
	if (await isServerUp()) {
		console.log("Using existing dev server.\n");
	} else {
		console.log("Starting dev server...");
		server = spawn("npx", ["astro", "dev", "--port", String(PORT)], {
			stdio: "pipe",
		});
		server.stderr.on("data", (d) => process.stderr.write(d));
		await waitForServer();
		console.log("Dev server ready.\n");
	}

	try {
		const config = JSON.parse(await readFile(CONFIG_PATH, "utf-8"));
		const { viewport } = config;

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setViewport(viewport);

		const updatedComponents = {};

		for (const name of COMPONENTS) {
			process.stdout.write(`  ${name}...`);
			const clip = await getClip(page, name, viewport);

			if (clip) {
				updatedComponents[name] = { strategy: "clip", clip };
				process.stdout.write(
					` (${clip.x}, ${clip.y}, ${clip.width}×${clip.height})\n`,
				);
			} else {
				updatedComponents[name] = { strategy: "full" };
				process.stdout.write(" fallback → full\n");
			}
		}

		await browser.close();

		const newConfig = {
			...config,
			components: updatedComponents,
		};

		await writeFile(CONFIG_PATH, `${JSON.stringify(newConfig, null, "\t")}\n`);
		console.log(`\nSaved to ${CONFIG_PATH}`);
		console.log("Run  npm run screenshots  to regenerate all images.");
	} finally {
		server?.kill();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
