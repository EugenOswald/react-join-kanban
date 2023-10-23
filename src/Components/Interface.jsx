import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppRoutes from '../routes/AppRoutes';

const Interface = ({ userData }) => {
	return (
		<>
			<div className='d-flex'>
				<Navbar />
				<Header />
				<AppRoutes userData={userData} />
			</div>
		</>
	);
};

export default Interface;
