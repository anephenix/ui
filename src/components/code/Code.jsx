import "./Code.scss";
import copy from "clipboard-copy";
import Highlight from "react-highlight";

const TitleBarButton = (id) => (
	<div className="title-bar-button" key={id} id={id} />
);

const TitleBarButtons = () => {
	const titleBarButtons = ["close", "minimize", "maximize"];
	return (
		<div id="title-bar-buttons">{titleBarButtons.map(TitleBarButton)}</div>
	);
};

const TitleBar = ({ title, code }) => (
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

const LineCount = ({ code }) => {
	const numberOfLines = code.split("\n").length;
	const lineNumbers = Array.from({ length: numberOfLines }, (_, i) => i + 1);
	return (
		<div id="line-count">
			{lineNumbers.map((lineNum) => (
				<div key={lineNum} className={"line-count-item"}>
					{lineNum}
				</div>
			))}
		</div>
	);
};

const CodeEditor = ({ code, language }) => {
	return (
		<div id="code-editor">
			<LineCount code={code} />
			<Highlight language={language}>{code}</Highlight>
		</div>
	);
};

// NOTE - ID is not best if you have multiple Code components on the same page
const Code = ({ title, code, language = "javascript" }) => (
	<div id="code">
		<TitleBar title={title} code={code} />
		<CodeEditor code={code} language={language} />
	</div>
);

export default Code;
