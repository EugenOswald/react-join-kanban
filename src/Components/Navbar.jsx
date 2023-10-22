import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Summery from './Summery';
import AddTask from './AddTask';
import Board from './Board';
import Contacts from './Contacts';

const Navbar = ({ userData }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Summery userData={userData} />} />
				<Route path='/addtask' element={<AddTask />} />
				<Route path='/board' element={<Board />} />
				<Route path='/contacts' element={<Contacts />} />
				{/* <Route path='*' element={<NoPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default Navbar;
