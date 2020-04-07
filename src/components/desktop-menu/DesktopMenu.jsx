import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import './DesktopMenu.scss';

const DesktopMenu = ({ links, loggedIn }) => (
	<ul id="desktop-menu">
		{links
			.filter((x) => !x.hideOnDesktop)
			.map((x) => {
				x.onClick = null;
				x.forMobile = null;
				return x;
			})
			.filter((x) => x.hideOptions({ loggedIn }))
			.map(MenuItem)}
	</ul>
);

export default DesktopMenu;
