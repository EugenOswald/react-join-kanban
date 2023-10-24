import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Summary from '../Components/Summary';
import AddTask from '../Components/AddTask';
import Board from '../Components/Board';
import Contacts from '../Components/Contacts';
import PrivacyPolicy from '../Components/PrivacyPolicy';
import LegalNotice from '../Components/LegalNotice';

const AppRoutes = ({ userData }) => {
	return (
		<Routes>
			<Route path='/' element={<Summary userData={userData} />} />
			<Route path='/addtask' element={<AddTask userData={userData} />} />
			<Route path='/board' element={<Board userData={userData} />} />
			<Route path='/contacts' element={<Contacts userData={userData} />} />
			<Route path='/privacypolicy' element={<PrivacyPolicy />} />
			<Route path='/legalnotice' element={<LegalNotice />} />
		</Routes>
	);
};

export default AppRoutes;
