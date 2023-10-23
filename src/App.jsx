import { useState } from 'react';
import Interface from './Components/Interface';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.scss';

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
				<Interface userData={userData}></Interface>
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
					<Card>
						{!showLoginForm ? (
							<svg
								onClick={() => setShowLoginForm(!showLoginForm)}
								className='arrow-left'
								xmlns='http://www.w3.org/2000/svg'
								width='32'
								height='32'
								viewBox='0 0 32 32'
								fill='none'
							>
								<path
									d='M10.4373 14.6667H25.3333C26.0696 14.6667 26.6666 15.2637 26.6666 16.0001C26.6666 16.7364 26.0696 17.3334 25.3333 17.3334H10.4373L16.6466 23.5427C17.1672 24.0634 17.1672 24.9074 16.6466 25.4281C16.126 25.9487 15.2819 25.9487 14.7613 25.4281L6.74746 17.4143C5.96642 16.6332 5.96642 15.3669 6.74747 14.5858L14.7613 6.57206C15.2819 6.05144 16.126 6.05144 16.6466 6.57206C17.1672 7.09268 17.1672 7.93677 16.6466 8.45739L10.4373 14.6667Z'
									fill='#29ABE2'
								/>
							</svg>
						) : (
							''
						)}
						{!showLoginForm ? <SignUpForm onRegistration={handleRegistration} /> : <LoginForm onLoading={handleLogin} />}
					</Card>
				</div>
			)}
		</>
	);
}

export default App;
