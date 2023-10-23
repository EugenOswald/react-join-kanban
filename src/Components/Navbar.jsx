import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import '../scss/navbar.scss';

const Navbar = () => {
	return (
		<BrowserRouter>
			<nav className='Navbar d-flex'>
				<ul>
					<li>
						<Link to='/'>Summery</Link>
					</li>
					<li>
						<Link to='/addtask'>Add Task</Link>
					</li>
					<li>
						<Link to='/board'>Board</Link>
					</li>
					<li>
						<Link to='/contacts'>Contacts</Link>
					</li>
				</ul>
			</nav>
		</BrowserRouter>
	);
};

export default Navbar;
