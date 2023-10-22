import React, { useState } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/**
 * LoginForm-Komponente für Benutzerauthentifizierung
 * 
 * @param {Object} props - Props der Komponente
 * @param {Function} props.onLoading - Callback-Funktion für den Fall, dass die Anmeldung erfolgreich ist
 * 
 * @returns {JSX.Element} Die LoginForm-Komponente
 */
const LoginForm = ({ onLoading }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	const guestEmail = 'guest@example.com';
	const guestPassword = 'guestPassword';

	const handleRememberMeClick = () => {
		const auth = getAuth();
		if (rememberMe) {
			setPersistence(auth, browserLocalPersistence);
		} else {
			setPersistence(auth, browserSessionPersistence);
		}
	};

	/**
	 * Anmeldedaten des Benutzers validieren und absenden
	 *
	 * @param {Event} e - Form-Submit-Event
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const db = getFirestore();
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

		if (userDoc.exists()) {
			const userData = userDoc.data();
			onLoading(userCredential.user, userData);
		} else {
			console.log('User not found');
		}
		try {
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Anmeldedaten des Guasts validieren und absenden
	 *
	 * @param {Event} e - Form-Submit-Event
	 */
	const anonymSubmit = async () => {
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
		const db = getFirestore();
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

		if (userDoc.exists()) {
			const userData = userDoc.data();
			onLoading(userCredential.user, userData);
		} else {
			console.log('User not found');
		}
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form onSubmit={handleSubmit} className='d-flex justify-content-center flex-column align-items-center w-100'>
			<h3 className='mb-3'>Log in</h3>
			<Form.Group className='mb-3 w-100'>
				<Form.Control placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</Form.Group>

			<Form.Group className='mb-5 w-100'>
				<Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Group>
			<Form.Check
				className='mb-4'
				label={<span>Remember me</span>}
				feedbackType='invalid'
				onChange={(e) => setRememberMe(e.target.checked)}
			/>
			<div className='d-flex justify-content-evenly  w-100'>
				<Button type='submit' disabled={!(email && password)}>
					Login
				</Button>{' '}
				<Button type='button' onClick={anonymSubmit}>
					Guest Login
				</Button>
			</div>
		</Form>
	);
};

export default LoginForm;
