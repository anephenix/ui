import MenuItem from "../menu-item/MenuItem";
import "./DesktopMenu.css";

interface LinkItem {
	id?: string;
	hideOnDesktop?: boolean;
	hideOptions: (opts: { loggedIn?: boolean }) => boolean;
	[key: string]: unknown;
}

interface DesktopMenuProps {
	links: LinkItem[];
	loggedIn?: boolean;
	Link: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
}

const DesktopMenu = ({ links, loggedIn, Link }: DesktopMenuProps) => (
	<ul id="desktop-menu">
		{links
			.filter((x) => !x.hideOnDesktop)
			.filter((x) => x.hideOptions({ loggedIn }))
			.map((link, i) => {
				return (
					<MenuItem
						{...(link as Parameters<typeof MenuItem>[0])}
						i={i}
						key={link.id as string}
						Link={Link}
					/>
				);
			})}
	</ul>
);

export default DesktopMenu;
