import React from 'react';
import './Terminal.scss';
import CopyToClipboard from 'react-copy-to-clipboard';

const Terminal = ({ title, code }) => {
	return (
		<div id='terminal'>
			<div id='title-bar'>
				<div id='title-bar-buttons'>
					<div className='title-bar-button' id='close' />
					<div className='title-bar-button' id='minimize' />
					<div className='title-bar-button' id='maximize' />
				</div>
				<div id='title-bar-title'>{title}</div>
				<div id='title-bar-actions'>
					<CopyToClipboard text={code}>
						<div className='title-bar-action'>{'Copy'}</div>
					</CopyToClipboard>
				</div>
			</div>
			<pre>
				<code>{code}</code>
			</pre>
		</div>
	);
};

export default Terminal;
