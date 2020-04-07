import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import './DesktopMenu.scss';

const DesktopMenu = ({ links, loggedIn }) => (
	<ul id="desktop-menu">
		{links
			.filter((x) => !x.hideOnDesktop)

			.filter((x) => x.hideOptions({ loggedIn }))
			.map((link, i) => {
				return <MenuItem {...link} i={i} key={i} />;
			})}
	</ul>
);

export default DesktopMenu;
