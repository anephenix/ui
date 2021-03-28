// Dependencies
import React, { Component } from 'react';

// Components
import Hamburger from '../hamburger/Hamburger';
import MobileMenu from '../mobile-menu/MobileMenu';
import DesktopMenu from '../desktop-menu/DesktopMenu';

// Styling
import './NavBar.scss';

/*
  NOTES

  This is a fully-working implementation which if extracted in full could be dropped into the other places.

  - Only things are:
  - Applies container and sidePadding CSS classes by default
  - Does not specify a way to set the hamburger and close icon colours - but can be overriden with CSS
  - Has a dependency on next/link for the menu items.
  - Will apply CSS styles, but can be overridden.

  # This was using React hooks for state, But I ran into an issue with loading this library into Sarus website
  # (possibly loading 2 versions of React) - so I've switched to using a React class component for now. Will
  # resolve this later when I figure out a way forward.

  */

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = { menuOpen: false };
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	render() {
		const { logo, links, Link, loggedIn, className, midSection=<div /> } = this.props;
		const { menuOpen } = this.state;
		return (
			<>
				<div id='nav-bar' className={className}>
					<div className='container'>
						<div className='withSidePadding'>
							{logo}
							{midSection}
							<Hamburger width="25px" onClick={this.toggleMenu} />
							<DesktopMenu {...{ links, loggedIn, Link }} />
						</div>
					</div>
				</div>
				<MobileMenu
					{...{
						menuOpen,
						toggleMenu: this.toggleMenu,
						links,
						loggedIn,
						Link,
					}}
				/>
			</>
		);
	}
}

export default NavBar;
