import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import '../scss/addTask.scss';

const AddTask = ({ userData }) => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<>
			<div className='add-task'>
				<h1>Add Task</h1>
				<Form noValidate className='' validated={validated} onSubmit={handleSubmit}>
					<Row className='mb-3 '>
						<Form.Group as={Col} md='6' className='pe-5'>
							<Form.Label>Title*</Form.Label>
							<Form.Control required type='text' placeholder='Enter a tile' defaultValue='' />
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Label>Description</Form.Label>
							<Form.Control as='textarea' rows={3} placeholder='Enter a Description' />
							<Form.Label>Assigned to</Form.Label>
							<Form.Select aria-label='Select contacts to assign'>
								<option>Select contacts to assign</option>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
						</Form.Group>

						<Form.Group as={Col} md='6'>
							<Form.Label>Due date*</Form.Label>
							<Form.Control type='date' />
							<Form.Label>Prio</Form.Label>
							<Form.Check aria-label='Urgent' /> <Form.Check aria-label='Medium' /> <Form.Check aria-label='Low' />
							<Form.Label>Category</Form.Label>
							<Form.Select aria-label='Select task category'>
								<option>Select task category</option>
								<option value='1'>One</option>
								<option value='2'>Two</option>
								<option value='3'>Three</option>
							</Form.Select>
							<Form.Label>Subtasks</Form.Label>
							<Form.Control type='text' placeholder='Add  new subtask' />
						</Form.Group>
					</Row>
					<Form.Group className='mb-3'>
						<Form.Check
							required
							label='Agree to terms and conditions'
							feedback='You must agree before submitting.'
							feedbackType='invalid'
						/>
					</Form.Group>
					<Button type='submit'>Submit form</Button>
				</Form>
			</div>
		</>
	);
};

export default AddTask;
