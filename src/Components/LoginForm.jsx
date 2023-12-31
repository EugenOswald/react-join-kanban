import React, { useState } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc,setDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth, googleProvider } from './Firebase';
import googleLogo from '../assets/icons/google-icon-logo.svg';

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
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const db = getFirestore();
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
		if (userDoc.exists()) {
			const userData = userDoc.data();
			onLoading(userCredential.user, userData);
		} else {
			console.log('User not found'); /* Fehler meldung erstellen */
		}
		try {
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * Anmeldedaten des Benutzers validieren und absenden
	 *
	 * @param {Event} e - Form-Submit-Event
	 */
	const signInWithGoogle = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithPopup(auth, googleProvider);
			const db = getFirestore();
			const userDocRef = doc(db, 'users', userCredential.user.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();
				onLoading(userCredential.user, userData);
			} else {
				// Wenn der Benutzer nicht in Firestore gefunden wird, erstellen wir einen neuen Eintrag für ihn
				const userData = {
					firstname: userCredential.user.displayName.split(' ')[0],
					lastname: userCredential.user.displayName.split(' ')[1],
					// weitere Felder, falls nötig
				};
				await setDoc(userDocRef, userData);
				console.log('Neuer Benutzer in Firestore erstellt', userData);
				
				onLoading(userCredential.user, userData); // Hier verwenden wir newUserData
				
			}
		} catch (error) {
			console.log('Fehler beim Google-Login:', error);
		}
	};


	/**
	 * Anmeldedaten des Guasts validieren und absenden
	 *
	 * @param {Event} e - Form-Submit-Event
	 */
	const anonymSubmit = async (e) => {
		e.preventDefault();
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

			<Form.Group className='mb-4 w-100'>
				<Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Group>
			<Form.Check
				className='mb-4'
				label={<span>Remember me</span>}
				feedbackType='invalid'
				onChange={(e) => setRememberMe(e.target.checked)}
			/>
			<div className='d-flex justify-content-evenly w-100'>
				<Button type='submit' disabled={!(email && password)}>
					Login
				</Button>{' '}
				<Button type='button' onClick={anonymSubmit}>
					Guest Login
				</Button>
			</div>
			<div className='d-flex justify-content-center align-items-center w-100 mt-4'>
				<p className='text-center mb-0 me-1'>Log in with:</p>
				<img className='login-icons ml-2' src={googleLogo} onClick={signInWithGoogle} />
			</div>
		</Form>
	);
};

export default LoginForm;
