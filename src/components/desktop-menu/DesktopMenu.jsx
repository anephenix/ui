import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import styles from './DesktopMenu.module.scss';

const DesktopMenu = ({ links, loggedIn, Link }) => (
	<ul id={styles['desktop-menu']}>
		{links
			.filter((x) => !x.hideOnDesktop)

			.filter((x) => x.hideOptions({ loggedIn }))
			.map((link, i) => {
				return <MenuItem {...link} i={i} key={i} Link={Link} />;
			})}
	</ul>
);

export default DesktopMenu;
