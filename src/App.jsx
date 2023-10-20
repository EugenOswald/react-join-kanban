import { useState } from 'react';
import arrowLeftLine from './assets/icons/arrow-left-line.png';
import Interface from './Components/Interface';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './scss/main.scss';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [showLoginForm, setShowLoginForm] = useState(true);
	const [user, setUser] = useState(null);
	const [userData, setUserData] = useState(null);

	const handleRegistration = () => {
		setShowLoginForm(true);
	};

	const handleLogin = (user, userData) => {
		setUser(user);
		setUserData(userData);
	};

	return (
		<>
			{user ? (
				<Interface username={userData.username}></Interface>
			) : (
				<div className='login-form-card d-flex justify-content-center align-items-center flex-column flex-grow'>
					{showLoginForm ? (
						<div className='container-toggle-login d-flex justify-content-center align-items-center flex-row'>
							<p>Not a Join user?</p>
							<Button variant='primary' className='toggleLogin' onClick={() => setShowLoginForm(!showLoginForm)}>
								Sing Up
							</Button>
						</div>
					) : (
						''
					)}
					<Card style={{ width: '18rem' }}>
							{!showLoginForm ? <img onClick={() => setShowLoginForm(!showLoginForm)} className='arrow-left' src={arrowLeftLine} alt='' /> : ''}
						{!showLoginForm ? <SignUpForm onRegistration={handleRegistration} /> : <LoginForm onLoading={handleLogin} />}
					</Card>
				</div>
			)}
		</>
	);
}

export default App;
