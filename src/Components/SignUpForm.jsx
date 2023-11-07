import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth } from './Firebase';

/**
 * SignUpForm - Eine React Komponente zur Benutzerregistrierung.
 *
 * @param {Object} props - Props der Komponente.
 * @param {Function} props.onRegistration - Callback, der nach erfolgreicher Registrierung aufgerufen wird.
 */
const SignUpForm = ({ onRegistration }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmpassword, setConfirmPassword] = useState('');
	const [firstname, setFirstName] = useState('');
	const [lastname, setLastName] = useState('');
	const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
	const [passwordAccepted, setPasswordAccepted] = useState(false);
	const [passwordLenght, setPasswordLenght] = useState(false);

	/**
	 * handleSubmit - Behandelt das Absenden des Registrierungsformulars.
	 *
	 * @param {Event} e - Standard-Eventobjekt.
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmpassword) {
			setPasswordMismatch(true);
			return;
		}

		if (password.length < 6) {
			setPasswordTooShort(true);
			return;
		}

		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			const db = getFirestore();
			setDoc(doc(db, 'users', userCredentials.user.uid), {
				firstname,
				lastname,
				acceptedprivacypolicy,
			}); /* Wir setzen den setDoc um den doc weil wir noch weite informationen mit geben möchten  */
			console.log('Regestrieung erfolgreich');
			onRegistration();
		} catch (error) {
			console.log('Fehler beim Anmelden:', error);
		}
	};

	return (
		<Form onSubmit={handleSubmit} className='d-flex justify-content-center flex-column align-items-center w-100'>
			<h3 className='mb-3'>Sign up</h3>
			<Form.Group className='mb-3 w-100'>
				<Form.Control placeholder='First Name' type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3 w-100'>
				<Form.Control placeholder='Last Name' type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3 w-100' controlId='email'>
				<Form.Control placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3 w-100'>
				<Form.Control placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-5 w-100'>
				<Form.Control
					placeholder='Confirm Password'
					type='password'
					value={confirmpassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Check
				className='mb-3'
				required
				label={
					<span>
						I accept the{' '}
						<a href='#privacy-policy' style={{ color: 'blue' }}>
							Privacy Policy
						</a>
					</span>
				}
				feedback='You must agree before submitting.'
				feedbackType='invalid'
				onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
			/>

			{passwordAccepted ? <p>Password does not match</p> : ''}
			{passwordLenght ? <p>min. lenght 6</p> : ''}
			<Button
				variant='primary'
				type='submit'
				disabled={!(email && password && confirmpassword && firstname && lastname && privacyPolicyAccepted)}
			>
				Sign up
			</Button>
		</Form>
	);
};

export default SignUpForm;
