import React, { useState } from 'react'; /* rafce -> shortkey für eine function Component erstellen */
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);

const RegisterForm = ({ onRegistration }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const auth = getAuth();

		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			const db = getFirestore();
			setDoc(doc(db, 'users', userCredentials.user.uid), {
				firstname,
				lastname,
			}); /* Wir setzen den setDoc um den doc weil wir noch weite informationen mit geben möchten  */
			console.log('Regestrieung erfolgreich');
			onRegistration();
		} catch (error) {
			console.log('Fehler beim Anmelden:', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3'>
				<Form.Control placeholder='First Name' type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Control placeholder='Last Name' type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3' controlId='email'>
				<Form.Control placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Control
					placeholder='Confirm Password'
					type='password'
					value={confirmpassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</Form.Group>

			<Button variant='primary' type='submit'>
				Sign up
			</Button>
		</Form>
	);
};

export default RegisterForm;
