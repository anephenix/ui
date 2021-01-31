import React from 'react';
import styles from './Hamburger.module.scss';

const Hamburger = ({ width, height, onClick }) => (
	<div id={styles.hamburger} onClick={onClick}>
		<svg
			width={width || '33px'}
			height={height || '26px'}
			viewBox="0 0 33 26"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<g
				id="hamburger-container"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
				strokeLinecap="end"
				strokeLinejoin="end"
			>
				<g
					id="hamburger-layers"
					transform="translate(-328.000000, -19.000000)"
					stroke="#000"
					strokeWidth="2"
				>
					<g id="Group" transform="translate(330.000000, 20.000000)">
						<path
							d="M0.357142857,1 L29.320836,1"
							id="layer-1"
						></path>
						<path
							d="M0.357142857,12 L29.320836,12"
							id="layer-2"
						></path>
						<path
							d="M0.357142857,23 L29.320836,23"
							id="layer-3"
						></path>
					</g>
				</g>
			</g>
		</svg>
	</div>
);

export default Hamburger;
