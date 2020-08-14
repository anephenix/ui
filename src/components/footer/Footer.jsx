import React from 'react';
// Components

// Styling
import './Footer.scss';

const UKFlag = ({ width = 60, height = 30 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 60 30"
		width={width}
		height={height}
	>
		<clipPath id="s">
			<path d="M0,0 v30 h60 v-30 z" />
		</clipPath>
		<clipPath id="t">
			<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
		</clipPath>
		<g clipPath="url(#s)">
			<path d="M0,0 v30 h60 v-30 z" fill="#012169" />
			<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
			<path
				d="M0,0 L60,30 M60,0 L0,30"
				clipPath="url(#t)"
				stroke="#C8102E"
				strokeWidth="4"
			/>
			<path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
			<path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
		</g>
	</svg>
);

const Footer = () => (
	<div id="footer">
		<div className="container">
			<div className="withSidePadding">
				<div className="copyright">
					&copy; {new Date().getFullYear()}{' '}
					<a
						href="https://anephenix.com"
						rel="noopen noreferrer"
						target="_blank"
					>
						Anephenix
					</a>
					. UI is licensed under the{' '}
					<a
						href="https://raw.githubusercontent.com/anephenix/ui/master/LICENSE"
						rel="noopen noreferrer"
						target="_blank"
					>
						MIT License
					</a>
					.
				</div>
				<div className="made-in-location">
					<UKFlag width={24} height={12} />
					<a
						href="https://www.gov.uk"
						rel="noopen noreferrer"
						target="_blank"
					>
						&nbsp; Made in the United Kingdom
					</a>
				</div>
			</div>
		</div>
	</div>
);

export default Footer;
