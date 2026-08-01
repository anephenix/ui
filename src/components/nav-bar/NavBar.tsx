import { Component } from "react";
import DesktopMenu from "../desktop-menu/DesktopMenu";
import Hamburger from "../hamburger/Hamburger";
import MobileMenu from "../mobile-menu/MobileMenu";
import "./NavBar.css";

interface LinkItem {
	id?: string;
	hideOnDesktop?: boolean;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
	[key: string]: unknown;
}

interface NavBarProps {
	logo?: React.ReactNode;
	links: LinkItem[];
	Link: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
	loggedIn?: boolean;
	className?: string;
	midSection?: React.ReactNode;
}

interface NavBarState {
	menuOpen: boolean;
}

class NavBar extends Component<NavBarProps, NavBarState> {
	constructor(props: NavBarProps) {
		super(props);
		this.state = { menuOpen: false };
		this.toggleMenu = this.toggleMenu.bind(this);
	}

	toggleMenu() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	render() {
		const {
			logo,
			links,
			Link,
			loggedIn,
			className,
			midSection = <div />,
		} = this.props;
		const { menuOpen } = this.state;
		return (
			<>
				<div id="nav-bar" className={className}>
					<div className="container">
						<div className="withSidePadding">
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
