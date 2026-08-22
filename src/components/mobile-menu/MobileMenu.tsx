import CloseIcon from "../close-icon/CloseIcon";
import MenuItem from "../menu-item/MenuItem";
import "@anephenix/ui-tokens/components/mobile-menu/MobileMenu.css";

interface LinkItem {
	id?: string;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
	[key: string]: unknown;
}

interface MobileMenuProps {
	menuOpen: boolean;
	toggleMenu: () => void;
	links: LinkItem[];
	loggedIn?: boolean;
	Link: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
}

const MobileMenu = ({
	menuOpen,
	toggleMenu,
	links,
	loggedIn,
	Link,
}: MobileMenuProps) => {
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
									key={link.id as string}
									{...(link as Parameters<typeof MenuItem>[0])}
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
