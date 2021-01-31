import React, { useState } from 'react';
import styles from './Terminal.module.scss';
import CopyToClipboard from 'react-copy-to-clipboard';

const Terminal = ({ title, code }) => {
	const [copyText, setCopyText] = useState('Copy');

	const onCopy = () => {
		setCopyText('Copied!');
		setTimeout(() => {
			setCopyText('Copy');
		}, 1500);
	};

	return (
		<div id={styles.terminal}>
			<div id={styles['title-bar']}>
				<div id={styles['title-bar-buttons']}>
					<div className={styles['title-bar-button']} id={styles.close} />
					<div className={styles['title-bar-button']} id={styles.minimize} />
					<div className={styles['title-bar-button']} id={styles.maximize} />
				</div>
				<div id={styles['title-bar-title']}>{title}</div>
				<div id={styles['title-bar-actions']}>
					<CopyToClipboard text={code} onCopy={onCopy}>
						<div className={styles['title-bar-action']}>{copyText}</div>
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
