import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddTask from './AddTask';

const AddTaskModal = (props) => {
	return (
		<Modal {...props} size='xl' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title>Add Task</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<AddTask />
			</Modal.Body>
		</Modal>
	);
};

export default AddTaskModal;
