import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppRoutes from '../routes/AppRoutes';


const Interface = ({ user, userData, logout }) => {
	

	return (
		<>
			<div className='d-flex flex-column'>
				<Header userData={userData} logout={logout} />
				<AppRoutes userData={userData} user={user} />
				<Navbar />
			</div>
		</>
	);
};

export default Interface;
