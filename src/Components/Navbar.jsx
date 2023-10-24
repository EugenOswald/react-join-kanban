import React from 'react';
import { Link } from 'react-router-dom';
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
			<ul>
				<li>
					<Link to='/'>
						<img src={summery} alt='' className='pe-3' />
						Summery
					</Link>
				</li>
				<li>
					<Link to='/addtask'>
						<img src={addtask} alt='' className='pe-3' />
						Add Task
					</Link>
				</li>
				<li>
					<Link to='/board'>
						<img src={board} alt='' className='pe-3' />
						Board
					</Link>
				</li>
				<li>
					<Link to='/contacts'>
						<img src={contacts} alt='' className='pe-3' />
						Contacts
					</Link>
				</li>
			</ul>
			<ul>
				<li>
					<Link to='/privacypolicy'>Privacy Policy</Link>
				</li>
				<li>
					<Link to='/legalnotice'>Legal notice</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
