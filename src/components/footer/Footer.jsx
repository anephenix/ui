import React from "react";
// Components

// Styling
import "./Footer.scss";

const Footer = ({ leftSection, rightSection }) => (
	<div id="footer">
		<div className="container">
			<div className="withSidePadding">
				{leftSection}
				{rightSection}
			</div>
		</div>
	</div>
);

export default Footer;
