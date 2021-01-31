
import React from 'react';
import styles from './Hero.module.scss';

const CTA = (Link) => {
	const f = ({ href, text, buttonClass }, i) => {
		if (!Link) return <a key={i} href={href} className={`button theme-default ${buttonClass}`}>{text}</a>;
		return (
			<Link key={i} href={href}>
				<a className={`button theme-default ${buttonClass}`}>{text}</a>
			</Link>
		);
	};
	return f;
};

const Hero = ({title, description, ctas, Link }) => {
	const ctaFunk = CTA(Link);
	return (
		<div id={styles.hero}>
			<div id={styles['heading-and-lead']}>
				<h1>{title}</h1>
				<p>{description}</p>
			</div>
			<div id={styles['hero-ctas']}>{ctas.map(ctaFunk)}</div>
		</div>
	);
};
			
export default Hero;