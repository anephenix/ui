import DocsLayout from "../DocsLayout.jsx";
import { ComponentExample } from "./ComponentExample.jsx";
import { PropTable } from "./shared.jsx";

const reactCode = `import { LiveTerminal } from '@anephenix/ui';
import { useState } from 'react';

const COMMANDS = ['help', 'echo', 'date', 'clear'];

export default function Shell() {
  const [lines, setLines] = useState([]);

  const getSuggestions = (input) =>
    input.includes(' ') ? [] : COMMANDS.filter((c) => c.startsWith(input));

  const onCommand = (command) => {
    setLines((prev) => {
      const next = [...prev, { type: 'input', text: command }];
      const [name, ...args] = command.trim().split(/\\s+/);
      if (name === 'help') {
        next.push({ type: 'output', text: 'Commands: help, echo <text>, date, clear' });
      } else if (name === 'echo') {
        next.push({ type: 'output', text: args.join(' ') });
      } else if (name === 'date') {
        next.push({ type: 'output', text: new Date().toString() });
      } else if (name === 'clear') {
        return [];
      } else {
        next.push({ type: 'error', text: \`command not found: \${name}\` });
      }
      return next;
    });
  };

  return (
    <LiveTerminal
      title="Shell"
      lines={lines}
      onCommand={onCommand}
      getSuggestions={getSuggestions}
    />
  );
}`;

const svelteCode = `<script>
	import { LiveTerminal } from "@anephenix/ui-svelte";

	const COMMANDS = ["help", "echo", "date", "clear"];
	let lines = $state([]);

	function getSuggestions(input) {
		return input.includes(" ") ? [] : COMMANDS.filter((c) => c.startsWith(input));
	}

	function oncommand(command) {
		const next = [...lines, { type: "input", text: command }];
		const [name, ...args] = command.trim().split(/\\s+/);
		if (name === "help") {
			next.push({ type: "output", text: "Commands: help, echo <text>, date, clear" });
		} else if (name === "echo") {
			next.push({ type: "output", text: args.join(" ") });
		} else if (name === "date") {
			next.push({ type: "output", text: new Date().toString() });
		} else if (name === "clear") {
			lines = [];
			return;
		} else {
			next.push({ type: "error", text: \`command not found: \${name}\` });
		}
		lines = next;
	}
</script>

<LiveTerminal title="Shell" {lines} {oncommand} {getSuggestions} />`;

export default function LiveTerminalPage({ currentPath }) {
	return (
		<DocsLayout currentPath={currentPath}>
			<div className="docs-content">
				<h1>LiveTerminal</h1>
				<p>
					An interactive version of{" "}
					<a href="/docs/components/terminal">Terminal</a>: a blinking prompt
					you can type into — including multi-line input with Shift+Enter —
					submitted commands are handed to a function you provide, and you feed
					the resulting standard output or standard error back in as lines to
					display. Supports arrow-key command history, Tab-based autocomplete,
					and the same resizable/fullscreen window as{" "}
					<a href="/docs/components/code-editor">CodeEditor</a>.
				</p>

				<h2>Props</h2>
				<PropTable
					rows={[
						["title", "string", "Title shown in the bar above the terminal"],
						[
							"prompt",
							"string",
							'The prompt symbol shown on the first line of input. Defaults to "$"',
						],
						[
							"continuationPrompt",
							"string",
							'The prompt shown on line 2+ of a multi-line command. Defaults to ">"',
						],
						[
							"lines",
							"LiveTerminalLine[]",
							'The transcript to render, above the live prompt. Each line is { id?, type: "input" | "output" | "error", text } — text may itself contain "\\n" for a multi-line command. You own this array — echo the submitted command and append stdout/stderr to it as they arrive',
						],
						[
							"onCommand",
							"(command: string) => void",
							"Called when Enter (without Shift) is pressed with a non-empty command. Shift+Enter inserts a newline instead of submitting",
						],
						[
							"getSuggestions",
							"(input: string) => string[]",
							"Called on Tab with the current input. A single match auto-completes; multiple matches complete to their common prefix and show a suggestion list",
						],
						[
							"disabled",
							"boolean",
							"Disables the input, e.g. while a command is still running. Defaults to false",
						],
						["width", "number", "Initial width in pixels. Defaults to 400"],
						[
							"height",
							"number",
							"Initial height of the scrollable transcript area in pixels. Defaults to 300",
						],
						[
							"resizable",
							"boolean",
							"Whether the bottom-right corner grip can resize the terminal. Defaults to true",
						],
						[
							"expandable",
							"boolean",
							"Whether the green title-bar button can expand the terminal to fill the browser window. Defaults to true",
						],
						[
							"historySize",
							"number",
							"Maximum number of commands kept for arrow-key recall. Defaults to 100",
						],
					]}
				/>

				<h2>Example</h2>
				<p>
					Try it: type <code>help</code>, <code>echo hello</code>,{" "}
					<code>date</code>, or press the Up arrow to recall a previous command.
					Typing <code>e</code> then Tab completes to <code>echo</code>. Press
					Shift+Enter to write a multi-line command.
				</p>
				<ComponentExample
					component="LiveTerminal"
					reactCode={reactCode}
					svelteCode={svelteCode}
				/>
			</div>
		</DocsLayout>
	);
}
