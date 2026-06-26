// Components

// Styling
import "./Footer.css";

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
