import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
									<div>
										<div>
											<ProgressBar now={50} />
										</div>
										<p>0/2 Subtasks</p>
									</div>
								</>
                            )}
                            <div></div>
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
