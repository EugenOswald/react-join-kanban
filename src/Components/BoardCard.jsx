import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BoardCardModal from './BoardCardModal';
import '../scss/boardCard.scss';

const BoardCard = React.memo(({ todo, userData }) => {
	const [showBoardCardModal, setShowBoardCardModal] = useState(false);
	const handleShow = () => setShowBoardCardModal(true);

	return (
		<>
			<Card className='board-card' onClick={handleShow}>
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
			<BoardCardModal showBoardCardModal={showBoardCardModal} onHide={() => setShowBoardCardModal(false)} todo={todo} />
		</>
	);
});

export default BoardCard;
