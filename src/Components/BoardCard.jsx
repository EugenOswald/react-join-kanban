import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';
import '../scss/boardCard.scss';

const BoardCard = ({ id, userData }) => {
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const docRef = doc(db, 'todos', id);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					setTodo({ id: docSnap.id, ...docSnap.data() });
				} else {
					console.log('Kein solches Dokument gefunden!');
				}
			} catch (error) {
				console.error('Fehler beim Abrufen des Dokuments: ', error);
			}
			setLoading(false);
		};

		if (id) fetchTodo();
	
	}, [id]);

	if (loading) {
		return <div>Lädt...</div>;
	}

	
	return (
		<Card className='board-card'>
			<Card.Body>
				{todo ? (
					<>
						<Card.Title>{todo.title}</Card.Title>
						<Card.Title>{todo.title}</Card.Title>
						<Card.Text>{todo.description}</Card.Text>
					</>
				) : (
					<div>Todo nicht gefunden</div>
				)}
			</Card.Body>
		</Card>
	);
};

export default BoardCard;
