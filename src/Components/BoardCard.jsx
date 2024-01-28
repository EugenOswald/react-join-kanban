import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';

import BoardCardModal from './BoardCardModal';
import '../scss/boardCard.scss';

const BoardCard = async ({ todo, userData }) => {
	const [showBoardCardModal, setShowBoardCardModal] = useState(false);
	const handleShow = () => setShowBoardCardModal(true);
	const [userInfo, setUserInfo] = useState([]);
	const usersCollectionRef = collection(db, 'users');

	const prio = todo.prio.toLowerCase();
	const imageSrc = (`src/assets/icons/prio-${prio}.svg`);

	const q = query(usersCollectionRef, where('id', 'in', todo.selectedUsers));

	
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((doc) => {console.log(doc)
});

	return (
		<>
			<Card className='board-card' onClick={handleShow}>
				<Card.Body>
					{todo ? (
						<>
							<div>
								<Card.Title className='category-header'>
									<p style={{ backgroundColor: todo.categoryColor }}>{todo.category}</p>
								</Card.Title>
							</div>
							<Card.Title>{todo.title}</Card.Title>
							<Card.Text>{todo.description}</Card.Text>
							{todo.subtasks.lenght > 0 ? (
								''
							) : (
								<>
									<div className='progessbar-container d-flex align-items-center'>
										<div className='flex-grow-1 me-2'>
											<ProgressBar now={50} />
										</div>
										<p className='mb-0'>0/2 Subtasks</p>
									</div>
								</>
							)}
							<div className='assignee'>
								<div></div>
								<img src={imageSrc} alt={`Priority: ${prio}`} />
							</div>
						</>
					) : (
						<div>Todo nicht gefunden</div>
					)}
				</Card.Body>
			</Card>
			<BoardCardModal showBoardCardModal={showBoardCardModal} onHide={() => setShowBoardCardModal(false)} todo={todo} />
		</>
	);
}

export default BoardCard;
