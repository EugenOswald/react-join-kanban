import React from 'react';

const Summery = ({ userData }) => {
	return (
		<p>
			Welcome, {userData.Firstname} {userData.Lastname}
		</p>
	);
};

export default Summery;
