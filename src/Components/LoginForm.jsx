import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginForm = ({ onLoding }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
			onLoding(userCredential.user, userData);
		} else {
			console.log('User not found');
		}
		try {
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='email'>
				Email
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
			</label>
			{/* mit onChange prüfen wir änderungen im input. Das machen wir mit dem e für event und taget value  OHNE DAS KÖNNTEN WIR NICHT IM INPUT SCHREIBEN*/}
			<label>
				Password:
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
			</label>
			<button type='submit'>Login</button>
		</form>
	);
};

export default LoginForm;
