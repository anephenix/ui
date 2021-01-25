
import React from 'react';
import './Hero.scss';

import Link from 'next/link';

const CTA = ({ href, text, buttonClass }, i) => (
	<Link key={i} href={href}>
		<a className={`button theme-default ${buttonClass}`}>{text}</a>
	</Link>
);

const Hero = ({title, description, ctas}) => (
	<div id="hero">
		<div id="heading-and-lead">
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
		<div id="hero-ctas">{ctas.map(CTA)}</div>
	</div>
);
			
export default Hero;