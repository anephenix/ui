import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import CloseIcon from '../close-icon/CloseIcon';
import styles from './MobileMenu.module.scss';

const MobileMenu = ({ menuOpen, toggleMenu, links, loggedIn, Link }) => {
	return (
		<div id={styles['mobile-menu']} className={menuOpen ? styles.open : styles.closed}>
			<div id={styles['mobile-menu-header']}>
				<div id={styles['close-icon']} onClick={toggleMenu}>
					<CloseIcon width="20px" />
				</div>
			</div>
			<ul>
				{links
					.filter((x) => x.hideOptions({ loggedIn }))
					.map((link, i) => {
						return (
							<MenuItem
								key={i}
								{...link}
								isMobile={true}
								toggleMenu={toggleMenu}
								i={i}
								Link={Link}
							/>
						);
					})}
			</ul>
		</div>
	);
};
export default MobileMenu;
