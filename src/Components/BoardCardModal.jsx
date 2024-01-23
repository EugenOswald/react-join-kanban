import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const BoardCardModal = ({ showBoardCardModal, onHide, todo }) => {

	return (
		<Modal show={showBoardCardModal} onHide={onHide} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title>{todo.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={onHide}>
					Close
				</Button>
				<Button variant='primary' onClick={onHide}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default BoardCardModal;
