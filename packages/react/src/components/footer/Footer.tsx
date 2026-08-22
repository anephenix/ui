import "@anephenix/ui-tokens/components/footer/Footer.css";

interface FooterProps {
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
}

const Footer = ({ leftSection, rightSection }: FooterProps) => (
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
