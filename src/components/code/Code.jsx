import React from 'react';
import './Code.scss';
import Highlight from 'react-highlight';
import CopyToClipboard from 'react-copy-to-clipboard';

const TitleBarButton = (id) => (
	<div className='title-bar-button' id={id} />
);

const TitleBarButtons = () => {
	const titleBarButtons = ['close','minimize', 'maximize'];
	return (
		<div id='title-bar-buttons'>
			{titleBarButtons.map(TitleBarButton)}
		</div>
	);
};

const TitleBar = ({title, code}) => (
	<div id='title-bar'>
		<TitleBarButtons />
		<div id='title-bar-title'>{title}</div>
		<div id='title-bar-actions'>
			<CopyToClipboard text={code}>
				<div className='title-bar-action'>Copy</div>
			</CopyToClipboard>
		</div>
	</div>
);

const LineCount = ({code}) => {
	const numberOfLines = code.split('\n').length;
	const lineCountArray = new Array(numberOfLines).fill(null);
	return (
		<div id='line-count'>
			{lineCountArray.map((a, i) => (
				<div key={i} className={'line-count-item'}>
					{i + 1}
				</div>
			))}
		</div>
	);
};

const CodeEditor = ({code, language}) => {
	return (
		<div id='code-editor'>
			<LineCount code={code} />
			<Highlight language={language}>{code}</Highlight>
		</div>
	);
};

const Code = ({ title, code, language = 'javascript' }) => (
	<div id="code">
		<TitleBar title={title} code={code} />
		<CodeEditor code={code} language={language} />
	</div>
);

export default Code;
