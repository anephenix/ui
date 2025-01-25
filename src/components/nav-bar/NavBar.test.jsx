/**
 * @jest-environment jsdom
*/
import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
	const props = {
			logo: <div>Logo</div>,
			links: [
				{
					href: '/home',
					label: 'Home',
					hideOnDesktop: false,
					hideOptions: () => false,
 				}
			],
			Link: ({ href, children }) => <a href={href}>{children}</a>,
			loggedIn: true,
			className: 'test-class',
			midSection: <div>Mid Section</div>,
		};

	describe('When viewed on a desktop', () => {

		test('renders logo and midSection', () => {
			window.innerWidth = 1280;
			window.innerHeight = 1080;
			window.dispatchEvent(new Event('resize'));
			const { getByText} = render(<NavBar {...props} />);
			expect(getByText('Logo')).toBeDefined();
			expect(getByText('Mid Section')).toBeDefined();
		});

		test.todo('renders the desktop menu');

	});

	describe('When viewed on a tablet or mobile device', () => {

		test.todo('renders the mobile menu');

		test.todo('toggles the mobile menu when the hamburger is clicked');

	});
});
