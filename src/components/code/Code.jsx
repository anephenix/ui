import React, { useState } from 'react';
import styles from './Code.module.scss';
import Highlight from 'react-highlight';
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
		<div id={styles.code}>
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
			<div id={styles['code-editor']}>
				<div id={styles['line-count']}>
					{lineCountArray.map((a, i) => (
						<div key={i} className={styles['line-count-item']}>
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
