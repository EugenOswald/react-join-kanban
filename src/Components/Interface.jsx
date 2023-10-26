import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import React from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AppRoutes from '../routes/AppRoutes';

const Interface = ({ userData }) => {
	return (
		<>
			<div className='d-flex'>
				<Header userData={userData} />
				<Navbar />
				<AppRoutes userData={userData} />
			</div>
		</>
	);
};

export default Interface;
