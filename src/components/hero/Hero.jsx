
import React from 'react';
import './Hero.scss';

const CTA = (Link) => {
	const f = ({ href, text, buttonClass }, i) => {
		if (!Link) return <a key={i} href={href} className={`button theme-default ${buttonClass}`}>{text}</a>;
		return (
			<Link key={i} href={href} className={`button theme-default ${buttonClass}`}>
				{text}
			</Link>
		);
	};
	return f;
};

const Hero = ({title, description, ctas, Link }) => {
	const ctaFunk = CTA(Link);
	if (typeof description === 'string') {
		description = <p>{description}</p>;
	}
	return (
		<div id="hero">
			<div id='heading-and-lead'>
				<h1>{title}</h1>
				{description}
			</div>
			<div id='hero-ctas'>{ctas.map(ctaFunk)}</div>
		</div>
	);
};
			
export default Hero;