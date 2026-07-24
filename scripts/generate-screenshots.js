import { exec, spawn } from "node:child_process";
import { mkdir, readFile } from "node:fs/promises";
import { promisify } from "node:util";
import puppeteer from "puppeteer";

const execAsync = promisify(exec);

const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

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

async function waitForServer(url, timeout = 60000) {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			// not ready yet
		}
		await new Promise((r) => setTimeout(r, 500));
	}
	throw new Error("Dev server did not start within the timeout period.");
}

async function takeScreenshot(page, name, outputPath, config) {
	const componentCfg = config.components[name] ?? {};
	const strategy = componentCfg.strategy ?? config.defaults.strategy;

	switch (strategy) {
		case "element": {
			const selector = componentCfg.selector ?? config.defaults.selector;
			const el = await page.$(selector);
			if (el) {
				await el.screenshot({ path: outputPath });
				return;
			}
			// selector not found — fall through to full viewport
			console.warn(
				`    ⚠ selector "${selector}" not found, falling back to full`,
			);
			await page.screenshot({ path: outputPath, fullPage: false });
			return;
		}
		case "clip": {
			await page.screenshot({
				path: outputPath,
				clip: componentCfg.clip,
				fullPage: false,
			});
			return;
		}
		case "full": {
			await page.screenshot({ path: outputPath, fullPage: false });
			return;
		}
		default:
			throw new Error(
				`Unknown strategy "${strategy}" for component "${name}". Valid values: element, clip, full.`,
			);
	}
}

async function main() {
	const config = JSON.parse(
		await readFile(new URL("screenshot-config.json", import.meta.url), "utf-8"),
	);

	console.log("Building library...");
	await execAsync("node build.js");
	console.log("Library built.");

	console.log("Starting Astro dev server...");
	const server = spawn("npx", ["astro", "dev", "--port", String(PORT)], {
		stdio: "pipe",
	});

	server.stderr.on("data", (data) => process.stderr.write(data));

	try {
		await waitForServer(BASE_URL);
		console.log("Dev server ready.\n");

		await mkdir(config.outputDir, { recursive: true });

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.setViewport(config.viewport);

		for (const name of COMPONENTS) {
			const url = `${BASE_URL}/preview?component=${name}`;
			const outputPath = `${config.outputDir}/${name}.png`;
			process.stdout.write(`  ${name}...`);
			await page.goto(url, { waitUntil: "networkidle0" });
			await page.waitForSelector(".preview-ready", { timeout: 10000 });
			await new Promise((r) => setTimeout(r, 300));
			await takeScreenshot(page, name, outputPath, config);
			process.stdout.write(" done\n");
		}

		await browser.close();
		console.log(`\nScreenshots saved to ${config.outputDir}/`);
	} finally {
		server.kill();
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
