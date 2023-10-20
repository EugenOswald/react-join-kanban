import { useState } from 'react';
import './App.scss';
import Interface from './Components/Interface';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [showLoginForm, setShowLoginForm] = useState(true); //Dient dazu zuprüfen ob man angemeldet ist oder nicht
	const [user, setUser] = useState(null); // Hiermit wollen wollen wir die Infos eMail/ PW vom User von firebase abgreifen
	const [userData, setUserData] = useState(null); // Hier griefen wir alle weiteren infos vom User ab

	const handleRegistration = () => {
		setShowLoginForm(true);
	};

	const handelLogin = (user, userData) => {
		setUser(user);
		setUserData(userData);
	};

	return (
		<>
			{user ? (
				<>
					<Interface username={userData.username}></Interface>
				</>
			) : (
				<>
					<div className='login-form-card d-flex justify-content-center align-items-center flex-column flex-grow'>
						<div className='container-toggle-login d-flex justify-content-center align-items-center flex-row'>
							<p>Not a Join user?</p>
							<Button variant='primary' className='toggleLogin' onClick={() => setShowLoginForm(!showLoginForm)}>
								{showLoginForm ? 'Sing Up' : ' Login'}
							</Button>
						</div>
						<Card style={{ width: '18rem' }}>
							{/* Mit der onClick erstellen wir eine Anonymefunktion mit der wird mithilfe von useState von showLoginForm den zustand von false auf true setzen */}
							{!showLoginForm ? <SingUpForm onRegistration={handleRegistration} /> : <LoginForm onLoding={handelLogin} />}
						</Card>
					</div>
				</>
			)}
		</>
	);
}

export default App;
