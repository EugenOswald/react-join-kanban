import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppRoutes from '../routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

const Interface = ({ userData }) => {
	return (
		<>
			<div className='d-flex'>
				<BrowserRouter>
					<Header  userData={userData} />
					<Navbar />
					<AppRoutes userData={userData} />
				</BrowserRouter>
			</div>
		</>
	);
};

export default Interface;
