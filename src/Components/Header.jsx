import React from 'react';
import '../scss/header.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import helpIcon from '../assets/icons/help-icon.svg';
import { Link } from 'react-router-dom';

const letterName = (userData) => {
	let firstNameLetter = userData.firstname.charAt(0);
	let lastNameLetter = userData.lastname.charAt(0);
	let letterName = firstNameLetter + lastNameLetter;
	return letterName.toUpperCase();
};

const Header = ({ userData }) => {
	return (
		<div className='Header'>
			<p>Kanban Project Management Tool</p>
			<div className='d-flex'>
				<Link to='/help' className='d-flex justify-content-center align-items-center me-3'>
					<img src={helpIcon} alt='' />
				</Link>
				<DropdownButton className='me-4' id='dropdown-basic-button' title={letterName(userData)}>
					<Dropdown.Item href='/'>Logout</Dropdown.Item>
				</DropdownButton>
			</div>
		</div>
	);
};

export default Header;
