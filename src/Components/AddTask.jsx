import React from 'react';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import checkIcon from '../assets/icons/check.svg';
import clearIcon from '../assets/icons/clear.svg';

import '../scss/addTask.scss';

const AddTask = ({ userData }) => {
	const [validated, setValidated] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedContacts, setSelectedContacts] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [selectedPrioButton, setSelectedPrioButton] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [subtasks, setSubtasks] = useState('');

	const handleClick = (value) => {
		setSelectedPrioButton(value);
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	const clearValues = () => {};

	return (
		<>
			<div className='add-task'>
				<div className='add-task-center'>
					<h1 className='mb-4'>Add Task</h1>
					<Form noValidate className='position-relative' validated={validated} onSubmit={handleSubmit}>
						<Row className='mb-3 '>
							<Form.Group as={Col} lg='6' className='pe-lg-4 pe-xl-5 '>
								<Form.Label>Title</Form.Label>
								<Form.Control
									required
									type='text'
									placeholder='Enter a title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
								<Form.Label>Description</Form.Label>
								<Form.Control
									required
									as='textarea'
									rows={3}
									placeholder='Enter a Description'
									className='mb-3 '
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
								<Form.Label>Assigned to</Form.Label>
								<Form.Select
									required
									aria-label='Select contacts to assign'
									className='mb-3'
									value={selectedContacts}
									onChange={(e) => setSelectedContacts(e.target.value)}
								>
									<option value=''>Select contacts to assign</option>
									<option value='1'>One</option>
									<option value='2'>Two</option>
									<option value='3'>Three</option>
								</Form.Select>
							</Form.Group>

							<Form.Group as={Col} lg='6' className='d-flex flex-column pe-lg-4 pe-xl-5 '>
								<Form.Label>Due date</Form.Label>
								<Form.Control
									required
									type='date'
									className='mb-3 '
									value={dueDate}
									onChange={(e) => setDueDate(e.target.value)}
								/>
								<Form.Label>Prio</Form.Label>
								<ButtonGroup className='mb-3 '>
									<Button
										variant={selectedPrioButton === 'Urgent' ? 'primary' : 'outline-primary'}
										onClick={() => handleClick('Urgent')}
									>
										Urgent
									</Button>
									<Button
										variant={selectedPrioButton === 'Medium' ? 'primary' : 'outline-primary'}
										onClick={() => handleClick('Medium')}
									>
										Medium
									</Button>
									<Button
										variant={selectedPrioButton === 'Low' ? 'primary' : 'outline-primary'}
										onClick={() => handleClick('Low')}
									>
										Low
									</Button>
								</ButtonGroup>
								<Form.Label>Category</Form.Label>
								<Form>
									<Form.Select
										required
										aria-label='Select task category'
										className='mb-3'
										value={selectedCategory}
										onChange={(e) => setSelectedCategory(e.target.value)}
									>
										<option value=''>Select task category</option>
										<option value='1'>One</option>
										<option value='2'>Two</option>
										<option value='3'>Three</option>
									</Form.Select>
								</Form>
								<Form.Label>Subtasks</Form.Label>
								<Form.Control
									type='text'
									placeholder='Add new subtask'
									value={subtasks}
									onChange={(e) => setSubtasks(e.target.value)}
								/>
							</Form.Group>
							<div className='d-flex justify-content-end mt-4 pe-lg-4 pe-xl-5'>
								<Button className='clear-form-button me-3 me-1' onClick={clearValues}>
									Clear
									<img src={clearIcon} alt='' srcset='' />
								</Button>
								<Button type='submit' className='submit-form-button me-1'>
									Create Task
									<img src={checkIcon} alt='' srcset='' />
								</Button>
							</div>
						</Row>
					</Form>
				</div>
			</div>
		</>
	);
};

export default AddTask;
