import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppRoutes from '../routes/AppRoutes';


const Interface = ({ user, userData, logout }) => {
	

	return (
		<>
			<div className='d-flex'>
				<Header userData={userData} logout={logout} />
				<Navbar />
				<AppRoutes userData={userData} user={user} />
			</div>
		</>
	);
};

export default Interface;
