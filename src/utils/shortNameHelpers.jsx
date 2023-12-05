import React from 'react';

const ShortName = ({ userData }) => {
	const getLetterName = () => {
		let firstNameLetter = userData.firstname.charAt(0);
		let lastNameLetter = userData.lastname.charAt(0);
		return (firstNameLetter + lastNameLetter).toUpperCase();
	};

	return <>{getLetterName()}</>;
};

export default ShortName;
