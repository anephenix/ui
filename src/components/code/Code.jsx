import React, { useState } from 'react';
import './Code.scss';
import Highlight from 'react-highlight.js';
import CopyToClipboard from 'react-copy-to-clipboard';

const Code = ({ title, code, language = 'javascript' }) => {
	const [copyText, setCopyText] = useState('Copy');

	const onCopy = () => {
		setCopyText('Copied!');
		setTimeout(() => {
			setCopyText('Copy');
		}, 1500);
	};

	const numberOfLines = code.split('\n').length;
	const lineCountArray = new Array(numberOfLines).fill(null);

	return (
		<div id="code">
			<div id="title-bar">
				<div id="title-bar-buttons">
					<div className="title-bar-button" id="close" />
					<div className="title-bar-button" id="minimize" />
					<div className="title-bar-button" id="maximize" />
				</div>
				<div id="title-bar-title">{title}</div>
				<div id="title-bar-actions">
					<CopyToClipboard text={code} onCopy={onCopy}>
						<div className="title-bar-action">{copyText}</div>
					</CopyToClipboard>
				</div>
			</div>
			<div id="code-editor">
				<div id="line-count">
					{lineCountArray.map((a, i) => (
						<div key={i} className="line-count-item">
							{i + 1}
						</div>
					))}
				</div>
				<Highlight language={language}>{code}</Highlight>
			</div>
		</div>
	);
};

export default Code;
