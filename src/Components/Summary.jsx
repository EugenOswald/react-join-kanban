import React from 'react';

const Summary = ({ userData }) => {
	return (
		<div className='d-flex align-items-center justify-content-center w-100'>
			<p>
				Good morning, {userData.Firstname} {userData.Lastname}
			</p>
		</div>
	);
};

export default Summary;
