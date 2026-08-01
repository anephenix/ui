import "./Code.css";
import copy from "clipboard-copy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TitleBarButton = (id: string) => (
	<div className="title-bar-button" key={id} id={id} />
);

const TitleBarButtons = () => {
	const titleBarButtons = ["close", "minimize", "maximize"];
	return (
		<div id="title-bar-buttons">{titleBarButtons.map(TitleBarButton)}</div>
	);
};

interface TitleBarProps {
	title?: string;
	code: string;
}

const TitleBar = ({ title, code }: TitleBarProps) => (
	<div id="title-bar">
		<TitleBarButtons />
		<div id="title-bar-title">{title}</div>
		<div id="title-bar-actions">
			<button
				type="button"
				className="title-bar-action"
				onClick={() => copy(code)}
			>
				Copy
			</button>
		</div>
	</div>
);

interface LineNumbersProps {
	code: string;
}

const LineNumbers = ({ code }: LineNumbersProps) => {
	const count = code.split("\n").length;
	const numbers = [];
	for (let i = 1; i <= count; i++) numbers.push(i);
	return (
		<div className="code-line-numbers" aria-hidden="true">
			{numbers.map((n) => (
				<span key={n} className="code-line-number">
					{n}
				</span>
			))}
		</div>
	);
};

interface CodeProps {
	title?: string;
	code: string;
	language?: string;
}

const Code = ({ title, code, language = "javascript" }: CodeProps) => (
	<div className="code">
		<TitleBar title={title} code={code} />
		<div className="code-editor">
			<LineNumbers code={code} />
			<SyntaxHighlighter
				language={language}
				style={oneDark}
				customStyle={{
					background: "transparent",
					margin: 0,
					padding: "10px 12px",
					fontSize: "10pt",
					borderRadius: 0,
					overflowX: "auto",
					flex: 1,
					minWidth: 0,
				}}
			>
				{code}
			</SyntaxHighlighter>
		</div>
	</div>
);

export default Code;
