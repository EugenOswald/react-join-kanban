import React from 'react';

const Interface = ({ userData }) => {
	return (
		<p>
			Welcome, {userData.Firstname} {userData.Lastname}
		</p>
	);
};

export default Interface;
