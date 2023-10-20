import React, { useState } from 'react';
import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

	const handleSubmit = async (e) => {
		e.preventDefault(); /* mit e fangen wird das event ab und verhindern das neuladen */
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		console.log('Eingelogt als :', userCredential.user);
		const db = getFirestore(); /* Datenbank Objekt */
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

		if (userDoc.exists()) {
			/* diese if abfrage dient dazu ist zum Testen vorgesehen */
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

	const anonymSubmit = async () => {
		const auth = getAuth();
		const userCredential = await signInWithEmailAndPassword(auth, guestEmail, guestPassword);
		console.log('Eingelogt als:', userCredential.user);
		const db = getFirestore(); /* Datenbank Objekt */
		const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

		if (userDoc.exists()) {
			/* diese if abfrage dient dazu ist zum Testen vorgesehen */
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
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3'>
				<Form.Control placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</Form.Group>

			<Form.Group className='mb-3'>
				<Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Group>
			<Form.Check
				className='mb-3'
				label={<span>Remember me</span>}
				feedbackType='invalid'
				onChange={(e) => setRememberMe(e.target.checked)}
			/>
			<div className='d-flex justify-content-evenly'>
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
