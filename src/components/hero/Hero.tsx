import "./Hero.css";

interface CTAItem {
	href: string;
	text: string;
	buttonClass?: string;
}

interface HeroProps {
	title: string;
	description: React.ReactNode;
	ctas: CTAItem[];
	Link?: React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
}

const CTA =
	(Link?: HeroProps["Link"]) =>
	({ href, text, buttonClass }: CTAItem, i: number) => {
		if (!Link)
			return (
				<a
					key={i}
					href={href}
					className={`button theme-default ${buttonClass}`}
				>
					{text}
				</a>
			);
		return (
			<Link
				key={i}
				href={href}
				className={`button theme-default ${buttonClass}`}
			>
				{text}
			</Link>
		);
	};

const Hero = ({ title, description, ctas, Link }: HeroProps) => {
	const ctaFunk = CTA(Link);
	const descriptionEl =
		typeof description === "string" ? <p>{description}</p> : description;
	return (
		<div id="hero">
			<div id="heading-and-lead">
				<h1>{title}</h1>
				{descriptionEl}
			</div>
			<div id="hero-ctas">{ctas.map(ctaFunk)}</div>
		</div>
	);
};

export default Hero;
