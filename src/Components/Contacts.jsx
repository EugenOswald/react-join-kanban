import React, { useEffect, useState } from 'react';
import '../scss/board.scss';

import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase';

const Contacts = ({ userData }) => {

    const [userList, setUserList] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const usersCollectionRef = collection(db, 'users');
			const data = await getDocs(usersCollectionRef);
			setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		fetchUsers();
    }, []);
    

	return (
		<div className='d-flex align-items-center justify-content-center w-100'>
			<p>
				Good morning, {userData.Firstname} {userData.Lastname}
			</p>
		</div>
	);
};

export default Contacts;
