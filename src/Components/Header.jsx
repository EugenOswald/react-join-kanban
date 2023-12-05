import React from 'react';
import '../scss/header.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import helpIcon from '../assets/icons/help-icon.svg';
import { Link } from 'react-router-dom';
import joinLogo from '../assets/icons/join-logo.svg';
import ShortName from '../utils/shortNameHelpers';

const Header = ({ userData, logout }) => {
	return (
		<div className='Header'>
			<img className='d-lg-none d-flex ms-4' src={joinLogo} alt='' />
			<p className='d-none d-lg-flex'>Kanban Project Management Tool</p>
			<div className='d-flex'>
				<Link to='/help' className='d-flex justify-content-center align-items-center me-3'>
					<img src={helpIcon} alt='' />
				</Link>
				<DropdownButton className='me-4' id='dropdown-basic-button' title={<ShortName userData={userData} />}>
					<Dropdown.Item>
						<Link to='/legalnotice'>Legal Notice</Link>
					</Dropdown.Item>
					<Dropdown.Item>
						<Link to='/privacypolicy'>Privacy Policy</Link>
					</Dropdown.Item>
					<Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
				</DropdownButton>
			</div>
		</div>
	);
};

export default Header;
