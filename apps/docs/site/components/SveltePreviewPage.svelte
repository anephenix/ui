<script lang="ts">
import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	Checkbox,
	Code,
	CodeEditor,
	ComboBox,
	Divider,
	Dropdown,
	Footer,
	FormField,
	Hero,
	Input,
	LiveTerminal,
	Modal,
	NavBar,
	Pagination,
	Popover,
	ProgressBar,
	RadioButton,
	Select,
	Skeleton,
	Spinner,
	Switch,
	Table,
	Tabs,
	Terminal,
	Textarea,
	Toast,
	Tooltip,
} from "@anephenix/ui-svelte";
import PreviewLink from "./PreviewLink.svelte";

const tableColumns = [
	{ key: "name", header: "Name" },
	{ key: "role", header: "Role" },
	{ key: "status", header: "Status" },
];
const tableRows = [
	{ id: 1, name: "Alice Chen", role: "Engineer", status: "Active" },
	{ id: 2, name: "Bob Smith", role: "Designer", status: "Active" },
	{ id: 3, name: "Carol Park", role: "Manager", status: "Away" },
];

type LiveTerminalDemoLine = {
	type: "input" | "output" | "error";
	text: string;
};
const LIVE_TERMINAL_COMMANDS = ["help", "echo", "date", "clear"];
let liveTerminalLines = $state<LiveTerminalDemoLine[]>([]);

function getLiveTerminalSuggestions(input: string) {
	return input.includes(" ")
		? []
		: LIVE_TERMINAL_COMMANDS.filter((c) => c.startsWith(input));
}

function onLiveTerminalCommand(command: string) {
	const next = [
		...liveTerminalLines,
		{ type: "input" as const, text: command },
	];
	const [commandName, ...args] = command.trim().split(/\s+/);
	if (commandName === "help") {
		next.push({
			type: "output",
			text: "Commands: help, echo <text>, date, clear",
		});
	} else if (commandName === "echo") {
		next.push({ type: "output", text: args.join(" ") });
	} else if (commandName === "date") {
		next.push({ type: "output", text: new Date().toString() });
	} else if (commandName === "clear") {
		liveTerminalLines = [];
		return;
	} else {
		next.push({ type: "error", text: `command not found: ${commandName}` });
	}
	liveTerminalLines = next;
}

const wrapperClass: Record<string, string> = {
	Accordion: "preview-padded",
	Alert: "preview-padded",
	Avatar: "preview-center",
	Badge: "preview-center",
	Breadcrumb: "preview-center",
	Button: "preview-center",
	Card: "preview-center",
	Checkbox: "preview-center",
	Code: "preview-center",
	CodeEditor: "preview-center",
	ComboBox: "preview-center",
	Divider: "preview-padded",
	Dropdown: "preview-center",
	Footer: "preview-bare",
	FormField: "preview-center",
	Hero: "preview-padded",
	Input: "preview-center",
	LiveTerminal: "preview-center",
	Modal: "preview-bare",
	NavBar: "preview-bare",
	Pagination: "preview-center",
	Popover: "preview-center",
	ProgressBar: "preview-padded",
	RadioButton: "preview-center",
	Select: "preview-center",
	Skeleton: "preview-padded",
	Spinner: "preview-center",
	Switch: "preview-center",
	Table: "preview-padded",
	Tabs: "preview-padded",
	Terminal: "preview-center",
	Textarea: "preview-center",
	Toast: "preview-center",
	Tooltip: "preview-center",
};

let name = $state<string | null>(null);

$effect(() => {
	const params = new URLSearchParams(window.location.search);
	name = params.get("component");
});
</script>

{#if name}
	<div class="{wrapperClass[name] ?? 'preview-center'} preview-ready">
		{#if name === "Accordion"}
			<Accordion
				items={[
					{
						id: "q1",
						title: "What is this component?",
						content: "An accordion collapses and expands content sections.",
					},
					{
						id: "q2",
						title: "How do I use it?",
						content: "Pass an items array with id, title, and content.",
					},
					{
						id: "q3",
						title: "Does it support multiple open panels?",
						content: "Yes — set the allowMultiple prop to true.",
					},
				]}
				defaultOpen="q1"
			/>
		{:else if name === "Alert"}
			<div style="display:flex;flex-direction:column;gap:0.75rem">
				<Alert variant="info" title="Information">
					Here is some useful information for you.
				</Alert>
				<Alert variant="success" title="Saved">
					Your changes have been saved successfully.
				</Alert>
				<Alert variant="warning">Your session will expire in 5 minutes.</Alert>
				<Alert variant="error" title="Error">
					Something went wrong. Please try again.
				</Alert>
			</div>
		{:else if name === "Avatar"}
			<div style="display:flex;align-items:center;gap:1.5rem">
				<Avatar name="Alice Brown" size="xl" />
				<Avatar name="Bob Smith" size="lg" />
				<Avatar name="Carol Park" size="md" />
				<Avatar size="sm" />
			</div>
		{:else if name === "Badge"}
			<div style="display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center">
				<Badge variant="default">Default</Badge>
				<Badge variant="primary">Primary</Badge>
				<Badge variant="success">Active</Badge>
				<Badge variant="warning">Pending</Badge>
				<Badge variant="error">Error</Badge>
				<Badge variant="info">Info</Badge>
				<Badge variant="secondary">Beta</Badge>
			</div>
		{:else if name === "Breadcrumb"}
			<Breadcrumb
				items={[
					{ label: "Home", href: "/" },
					{ label: "Products", href: "/products" },
					{ label: "Laptops", href: "/products/laptops" },
					{ label: "MacBook Pro" },
				]}
			/>
		{:else if name === "Button"}
			<div style="display:flex;flex-wrap:wrap;gap:0.75rem;justify-content:center">
				<Button text="Primary" class="button theme-default primary" />
				<Button text="Secondary" class="button theme-default secondary" />
				<Button text="Tertiary" class="button theme-default tertiary" />
				<Button text="Alternate" class="button theme-default primary alternate" />
			</div>
		{:else if name === "Card"}
			<div style="display:flex;gap:1rem">
				<Card title="Getting started" subtitle="Up and running in minutes">
					{#snippet footer()}
						<Button text="Read docs" class="button theme-default primary" />
					{/snippet}
					<p style="margin:0">Build consistent UIs with a plain-CSS design system.</p>
				</Card>
				<Card title="Components" subtitle="30+ ready-made components">
					<p style="margin:0">Accessible, themeable, and zero runtime dependencies.</p>
				</Card>
			</div>
		{:else if name === "Checkbox"}
			<div style="display:flex;flex-direction:column;gap:0.75rem">
				<Checkbox
					name="terms"
					label="I agree to the terms and conditions"
					defaultValue={true}
				/>
				<Checkbox name="newsletter" label="Subscribe to the newsletter" defaultValue={false} />
				<Checkbox name="updates" label="Receive product updates" defaultValue={true} />
			</div>
		{:else if name === "Code"}
			<Code
				title="greet.js"
				code={"const greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\ngreet('World');"}
				language="javascript"
			/>
		{:else if name === "CodeEditor"}
			<CodeEditor
				title="greet.js"
				code={"function greet(name) {\n  return `Hello, ${name}!`;\n}\n\ngreet('World');"}
				language="javascript"
			/>
		{:else if name === "ComboBox"}
			<div style="width:280px">
				<ComboBox
					options={[
						{ value: "apple", label: "Apple" },
						{ value: "banana", label: "Banana" },
						{ value: "cherry", label: "Cherry" },
						{ value: "grape", label: "Grape" },
						{ value: "mango", label: "Mango" },
						{ value: "orange", label: "Orange" },
					]}
					placeholder="Search fruit..."
				/>
			</div>
		{:else if name === "Divider"}
			<div style="display:flex;flex-direction:column;gap:1.25rem">
				<Divider />
				<Divider variant="dashed" />
				<Divider variant="dotted" />
				<Divider label="or continue with" />
			</div>
		{:else if name === "Dropdown"}
			<Dropdown
				name="language"
				class=""
				options={[
					{ value: "js", text: "JavaScript" },
					{ value: "ts", text: "TypeScript" },
					{ value: "py", text: "Python" },
					{ value: "go", text: "Go" },
				]}
			/>
		{:else if name === "Footer"}
			<Footer>
				{#snippet leftSection()}
					<span>&copy; 2026 Anephenix Ltd.</span>
				{/snippet}
				{#snippet rightSection()}
					<div style="display:flex;gap:1rem">
						<a href="/privacy">Privacy</a>
						<a href="/terms">Terms</a>
					</div>
				{/snippet}
			</Footer>
		{:else if name === "FormField"}
			<div style="display:flex;flex-direction:column;gap:1rem">
				<FormField error="This field is required">
					<Input name="email" type="email" placeholder="Enter your email" />
				</FormField>
				<FormField error="Password must be at least 8 characters">
					<Input name="password" type="password" placeholder="Password" />
				</FormField>
			</div>
		{:else if name === "Hero"}
			<Hero
				title="Build faster with UI"
				description="A complete design system for Svelte with accessible, themeable components."
				ctas={[
					{ href: "/get-started", text: "Get started", buttonClass: "primary" },
					{ href: "/docs", text: "Documentation", buttonClass: "secondary alternate" },
				]}
				Link={PreviewLink}
			/>
		{:else if name === "Input"}
			<div style="display:flex;flex-direction:column;gap:0.75rem">
				<Input name="name" placeholder="Full name" />
				<Input name="email" type="email" placeholder="Email address" />
				<Input name="search" type="search" placeholder="Search..." />
			</div>
		{:else if name === "LiveTerminal"}
			<LiveTerminal
				title="Shell"
				lines={liveTerminalLines}
				oncommand={onLiveTerminalCommand}
				getSuggestions={getLiveTerminalSuggestions}
			/>
		{:else if name === "Modal"}
			<Modal isOpen={true} onClose={() => {}} title="Confirm action">
				{#snippet footer()}
					<Button text="Cancel" class="button theme-default secondary alternate" />
					<Button text="Confirm" class="button theme-default primary" />
				{/snippet}
				<p>
					Are you sure you want to delete this item? This action cannot be undone.
				</p>
			</Modal>
		{:else if name === "NavBar"}
			<NavBar
				links={[
					{ id: "docs", text: "Docs", url: "/docs", hideOptions: () => true },
					{ id: "github", text: "GitHub", url: "https://github.com", hideOptions: () => true },
				]}
				loggedIn={false}
				Link={PreviewLink}
			>
				{#snippet logo()}
					<a href="/"><strong>UI</strong></a>
				{/snippet}
			</NavBar>
		{:else if name === "Pagination"}
			<Pagination currentPage={4} totalPages={12} onPageChange={() => {}} siblingCount={1} />
		{:else if name === "Popover"}
			<Popover title="Display options" position="bottom">
				{#snippet trigger(triggerProps)}
					<button type="button" class="button theme-default secondary" {...triggerProps}>
						Open options
					</button>
				{/snippet}
				{#snippet content()}
					<div style="display:flex;flex-direction:column;gap:0.5rem">
						<Switch name="dark" label="Dark mode" />
						<Switch name="compact" label="Compact view" />
					</div>
				{/snippet}
			</Popover>
		{:else if name === "ProgressBar"}
			<div style="display:flex;flex-direction:column;gap:1rem">
				<ProgressBar value={30} label="Uploading" showValue={true} />
				<ProgressBar value={65} variant="success" label="Complete" showValue={true} />
				<ProgressBar value={80} variant="warning" label="Storage" showValue={true} />
				<ProgressBar indeterminate={true} variant="default" label="Processing..." />
			</div>
		{:else if name === "RadioButton"}
			<div style="display:flex;flex-direction:column;gap:0.75rem">
				<RadioButton name="size" label="Small" value="sm" checked={false} onchange={() => {}} />
				<RadioButton name="size" label="Medium" value="md" checked={true} onchange={() => {}} />
				<RadioButton name="size" label="Large" value="lg" checked={false} onchange={() => {}} />
			</div>
		{:else if name === "Select"}
			<Select
				name="country"
				class=""
				options={[
					{ value: "gb", label: "United Kingdom" },
					{ value: "us", label: "United States" },
					{ value: "de", label: "Germany" },
					{ value: "fr", label: "France" },
				]}
			/>
		{:else if name === "Skeleton"}
			<div style="display:flex;flex-direction:column;gap:1rem">
				<div style="display:flex;align-items:center;gap:1rem">
					<Skeleton width={48} height={48} borderRadius="50%" />
					<div style="flex:1">
						<Skeleton width="60%" height="1rem" />
						<div style="margin-top:0.4rem">
							<Skeleton width="40%" height="0.75rem" />
						</div>
					</div>
				</div>
				<Skeleton lines={3} />
				<Skeleton width="80%" />
			</div>
		{:else if name === "Spinner"}
			<div style="display:flex;align-items:center;gap:2rem">
				<Spinner size="sm" />
				<Spinner size="md" />
				<Spinner size="lg" />
			</div>
		{:else if name === "Switch"}
			<div style="display:flex;flex-direction:column;gap:0.75rem">
				<Switch name="notifications" label="Enable notifications" checked={true} />
				<Switch name="darkMode" label="Dark mode" checked={false} />
				<Switch name="updates" label="Automatic updates" checked={true} />
			</div>
		{:else if name === "Table"}
			<Table columns={tableColumns} rows={tableRows} caption="Team members" />
		{:else if name === "Tabs"}
			<Tabs
				tabs={[
					{
						id: "overview",
						label: "Overview",
						content: "This is the overview content for the selected tab.",
					},
					{
						id: "specs",
						label: "Specifications",
						content: "Technical specifications and requirements go here.",
					},
					{
						id: "reviews",
						label: "Reviews",
						content: "Customer reviews and ratings appear in this panel.",
					},
				]}
				defaultTab="overview"
			/>
		{:else if name === "Terminal"}
			<Terminal title="Install" code="npm i @anephenix/ui-svelte --save" />
		{:else if name === "Textarea"}
			<Textarea
				name="message"
				placeholder="Enter your message here..."
				defaultValue="This is an example of a multi-line text area component for longer form content."
			/>
		{:else if name === "Toast"}
			<div style="display:flex;flex-direction:column;gap:0.75rem;width:360px">
				<div style="position:relative;height:70px">
					<Toast
						isVisible={true}
						title="Saved"
						message="Your changes have been saved."
						variant="success"
						position="top-right"
						onClose={() => {}}
						duration={0}
					/>
				</div>
				<div style="position:relative;height:70px">
					<Toast
						isVisible={true}
						title="Error"
						message="Something went wrong. Please try again."
						variant="error"
						position="top-right"
						onClose={() => {}}
						duration={0}
					/>
				</div>
			</div>
		{:else if name === "Tooltip"}
			<div style="display:flex;gap:2rem">
				<Tooltip content="Save your changes" position="top">
					<Button text="Save" class="button theme-default primary" />
				</Tooltip>
				<Tooltip content="Discard all changes" position="top">
					<Button text="Discard" class="button theme-default secondary alternate" />
				</Tooltip>
			</div>
		{:else}
			<p>No preview available for: {name}</p>
		{/if}
	</div>
{/if}
