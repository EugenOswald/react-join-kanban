import React from 'react';

const Summary = ({ userData }) => {
	return (
		<div className='d-flex align-items-center justify-content-center w-100'>
			<p>
				Good morning, {userData.firstname} {userData.lastname}
			</p>
		</div>
	);
};

export default Summary;
