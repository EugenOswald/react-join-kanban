import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './Components/Firebase';
import Interface from './Components/Interface';
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [showLoginForm, setShowLoginForm] = useState(true);
	/**
	 * @type {[Object, Function]}
	 * @description
	 * - `user`: Das aktuelle Benutzerobjekt, das von Firebase Auth zurückgegeben wird.
	 *   Es enthält Informationen wie die `uid`, `email` usw.
	 * - `setUser`: Eine Funktion, die den Wert von `user` aktualisiert.
	 */
	const [user, setUser] = useState(null);

	/**
	 * @type {[Object, Function]}
	 * @description
	 * - `userData`: Zusätzliche benutzerspezifische Daten, die in der Firestore-Datenbank gespeichert sind.
	 *   Hier sind `firstname` und `lastname` gespeichert.
	 * - `setUserData`: Eine Funktion, die den Wert von `userData` aktualisiert.
	 */
	const [userData, setUserData] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		if (!user && showLoginForm) {
			navigate('/login');
		} else if (!user && !showLoginForm) {
			navigate('/signup');
		}
	}, [user, showLoginForm, navigate]);

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
			setUserData(null);
		} catch (err) {
			console.error(err);
		}
	};


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
				<Interface userData={userData} user={user} logout={logout} />
			) : (
				<div className='login-form-card d-flex justify-content-center align-items-center flex-column flex-grow'>
					{showLoginForm ? (
						<div className='container-toggle-login d-flex justify-content-center align-items-center flex-row'>
							<p>Not a Join user?</p>
							<Button variant='primary' className='toggleLogin' onClick={() => setShowLoginForm(!showLoginForm)}>
								Sign Up
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
						{!showLoginForm ? (
							<Routes>
								<Route path='signup' element={<SignUpForm onRegistration={handleRegistration} />} />
							</Routes>
						) : (
							<Routes>
								<Route path='login' element={<LoginForm onLoading={handleLogin} />} />
							</Routes>
						)}
					</Card>
				</div>
			)}
		</>
	);
}

export default App;
