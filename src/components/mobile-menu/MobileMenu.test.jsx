import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from './MobileMenu';
import MenuItem from '../menu-item/MenuItem';
import CloseIcon from '../close-icon/CloseIcon';

jest.mock('../menu-item/MenuItem', () => jest.fn(() => <div>MenuItem</div>));
jest.mock('../close-icon/CloseIcon', () => jest.fn(() => <div>CloseIcon</div>));

describe('MobileMenu', () => {
	const mockToggleMenu = jest.fn();
	const mockLinks = [
		{ hideOptions: jest.fn(() => true), name: 'Link1' },
		{ hideOptions: jest.fn(() => false), name: 'Link2' },
	];
	const mockLinkComponent = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders correctly when menu is open', () => {
		render(
			<MobileMenu
				menuOpen={true}
				toggleMenu={mockToggleMenu}
				links={mockLinks}
				loggedIn={true}
				Link={mockLinkComponent}
			/>
		);

		expect(screen.getByText('CloseIcon')).toBeInTheDocument();
		expect(screen.getByText('MenuItem')).toBeInTheDocument();
		expect(screen.getByText('MenuItem')).toBeInTheDocument();
	});

	test('renders correctly when menu is closed', () => {
		render(
			<MobileMenu
				menuOpen={false}
				toggleMenu={mockToggleMenu}
				links={mockLinks}
				loggedIn={true}
				Link={mockLinkComponent}
			/>
		);
		
		expect(screen.getByText('CloseIcon')).toBeInTheDocument();
		expect(screen.queryByText('MenuItem')).not.toBeInTheDocument();
	});

	test('calls toggleMenu when close icon is clicked', () => {
		render(
			<MobileMenu
				menuOpen={true}
				toggleMenu={mockToggleMenu}
				links={mockLinks}
				loggedIn={true}
				Link={mockLinkComponent}
			/>
		);

		fireEvent.click(screen.getByText('CloseIcon'));
		expect(mockToggleMenu).toHaveBeenCalledTimes(1);
	});

	test('filters links based on hideOptions', () => {
		render(
			<MobileMenu
				menuOpen={true}
				toggleMenu={mockToggleMenu}
				links={mockLinks}
				loggedIn={true}
				Link={mockLinkComponent}
			/>
		);

		expect(mockLinks[0].hideOptions).toHaveBeenCalledWith({ loggedIn: true });
		expect(mockLinks[1].hideOptions).toHaveBeenCalledWith({ loggedIn: true });
		expect(screen.getAllByText('MenuItem')).toHaveLength(1);
	});
});