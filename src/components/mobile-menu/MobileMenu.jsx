import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import CloseIcon from '../close-icon/CloseIcon';
import './MobileMenu.scss';

const MobileMenu = ({ mobileMenuClass, toggleMenu, links, loggedIn }) => {
	return (
		<div id="mobile-menu" className={mobileMenuClass}>
			<div id="mobile-menu-header">
				<div id="close-icon" onClick={toggleMenu}>
					<CloseIcon width="20px" />
				</div>
			</div>
			<ul>
				{links
					.filter((x) => x.hideOptions({ loggedIn }))
					.map((x) => {
						x.onClick = toggleMenu;
						x.forMobile = true;
						return x;
					})
					.map(MenuItem)}
			</ul>
		</div>
	);
};
export default MobileMenu;
