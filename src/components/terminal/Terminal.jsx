import React from "react";
import "./Terminal.scss";
import copy from "clipboard-copy";

const Terminal = ({ title, code }) => {
	return (
		<div id="terminal">
			<div id="title-bar">
				<div id="title-bar-buttons">
					<div className="title-bar-button" id="close" />
					<div className="title-bar-button" id="minimize" />
					<div className="title-bar-button" id="maximize" />
				</div>
				<div id="title-bar-title">{title}</div>
				<div id="title-bar-actions">
					<div className="title-bar-action" onClick={() => copy(code)}>
						Copy
					</div>
				</div>
			</div>
			<pre>
				<code>{code}</code>
			</pre>
		</div>
	);
};

export default Terminal;
