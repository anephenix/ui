import React from 'react';
import MenuItem from '../menu-item/MenuItem';
import CloseIcon from '../close-icon/CloseIcon';
import './MobileMenu.scss';

const MobileMenu = ({ menuOpen, toggleMenu, links, loggedIn, Link }) => {
	return (
		<div id='mobile-menu' className={menuOpen ? 'open' : 'closed'}>
			<div id='mobile-menu-header'>
				<div id='close-icon' onClick={toggleMenu}>
					<CloseIcon width="20px" />
				</div>
			</div>
				{menuOpen && (
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
							})
						}
					</ul>)
				}
		</div>
	);
};
export default MobileMenu;
