import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import joinLogo from '../assets/icons/join-logo-light.svg';
import addtask from '../assets/icons/add-task-icon.svg';
import board from '../assets/icons/board-icon.svg';
import contacts from '../assets/icons/contacts-icon.svg';
import summery from '../assets/icons/summary-icon.svg';

import '../scss/navbar.scss';

const Navbar = () => {
	return (
		<nav className='Navbar'>
			<img src={joinLogo} alt='' />
			<ul className='d-flex flex-column w-100'>
				<NavLink to='/' exact >
					<li>
						<img src={summery} alt='' className='pe-3' />
						Summery
					</li>
				</NavLink>
				<NavLink to='/addtask' exact>
					<li>
						<img src={addtask} alt='' className='pe-3' />
						Add Task
					</li>
				</NavLink>
				<NavLink to='/board' exact>
					<li>
						<img src={board} alt='' className='pe-3' />
						Board
					</li>
				</NavLink>
				<NavLink to='/contacts' exact>
					<li>
						<img src={contacts} alt='' className='pe-3' />
						Contacts
					</li>
				</NavLink>
			</ul>
			<ul className='d-flex flex-column w-100'>
				<li className='mb-3'>
					<Link to='/privacypolicy' className='color-gray'>
						Privacy Policy
					</Link>
				</li>
				<li>
					<Link to='/legalnotice' className='color-gray'>
						Legal notice
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
