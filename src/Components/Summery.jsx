import React from 'react';

const Summery = ({ userData }) => {
	return (
		<div>
			<p>
				Good morning, {userData.Firstname} {userData.Lastname}
			</p>
		</div>
	);
};

export default Summery;
