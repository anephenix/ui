import CloseIcon from "../close-icon/CloseIcon";
import MenuItem from "../menu-item/MenuItem";
import "./MobileMenu.scss";

const MobileMenu = ({ menuOpen, toggleMenu, links, loggedIn, Link }) => {
	return (
		<div id="mobile-menu" className={menuOpen ? "open" : "closed"}>
			<div id="mobile-menu-header">
				<button type="button" id="close-icon" onClick={toggleMenu}>
					<CloseIcon width="20px" />
				</button>
			</div>
			{menuOpen && (
				<ul>
					{links
						.filter((x) => x.hideOptions({ loggedIn }))
						.map((link, i) => {
							return (
								<MenuItem
									key={link.id}
									{...link}
									isMobile={true}
									toggleMenu={toggleMenu}
									i={i}
									Link={Link}
								/>
							);
						})}
				</ul>
			)}
		</div>
	);
};
export default MobileMenu;
