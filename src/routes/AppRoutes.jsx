import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Summery from '../Components/Summery';
import AddTask from '../Components/AddTask';
import Board from '../Components/Board';
import Contacts from '../Components/Contacts';

const AppRoutes = ({ userData }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Summery userData={userData} />} />
				<Route path='/addtask' element={<AddTask />} />
				<Route path='/board' element={<Board />} />
				<Route path='/contacts' element={<Contacts />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
