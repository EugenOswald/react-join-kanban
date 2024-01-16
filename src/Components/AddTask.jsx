import React from 'react';
import { useState, useEffect } from 'react';
import { db } from './Firebase';
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { Form, Button, ButtonGroup, Dropdown, DropdownButton, InputGroup, FormControl, Col, Row, Toast } from 'react-bootstrap';
import ShortName from '../utils/shortNameHelpers';
import checkIcon from '../assets/icons/check.svg';
import clearIcon from '../assets/icons/clear.svg';
import clearBlueIcon from '../assets/icons/close-blue.svg';
import personAdd from '../assets/icons/person-add.svg';
import prioUrgent from '../assets/icons/prio-urgent.svg';
import prioUrgentWhite from '../assets/icons/prio-urgent-white.svg';
import prioMedium from '../assets/icons/prio-medium.svg';
import prioMediumWhite from '../assets/icons/prio-medium-white.svg';
import prioLow from '../assets/icons/prio-low.svg';
import prioLowWhite from '../assets/icons/prio-low-white.svg';
import '../scss/addTask.scss';

const AddTask = ({ userData }) => {
	/* State Variable */
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [dueDate, setDueDate] = useState('');
	const [selectedPrioButton, setSelectedPrioButton] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [subtasks, setSubtasks] = useState('');

	const [validated, setValidated] = useState(false);
	const [isHovered, setIsHovered] = useState('');
	const [userList, setUserList] = useState([]);
	const [isClearButtonHovered, setIsClearButtonHovered] = useState(false);
	const [taskAddedSuccessfully, setTaskAddedSuccessfully] = useState(false);

	const usersCollectionRef = collection(db, 'users');
	const todosCollectionRef = collection(db, 'todos');

	const options = [
		{ label: 'Contact 1', value: '1' },
		{ label: 'Contact 2', value: '2' },
		{ label: 'Contact 3', value: '3' },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await addDoc(todosCollectionRef, {
				title: title,
				description: description,
				selectedOptions: selectedOptions,
				dueDate: dueDate,
				prio: selectedPrioButton,
				category: selectedCategory,
				subtasks: subtasks,
			});
			setTaskAddedSuccessfully(true);
			console.log('Regestrieung erfolgreich');
		} catch (error) {
			console.log('Fehler beim Anmelden:', error);
		}
	};

	useEffect(() => {
		const getUsersList = async () => {
			try {
				const data = await getDocs(usersCollectionRef);
				const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				setUserList(filteredData);
			} catch (err) {
				console.error(err);
			}
		};
		getUsersList();
	}, []);

	useEffect(() => {
		const selectedButton = priorityButtons.find((button) => button.label === selectedPrioButton);
		if (selectedButton) {
		}
	}, [selectedPrioButton]);

	const handleMouseEnter = (label) => {
		if (isHovered !== label) {
			setIsHovered(label);
		}
	};

	const handleMouseLeave = () => {
		setIsHovered('');
	};


	const handleClickPrio = (label) => {
		if (selectedPrioButton !== label) {
			setSelectedPrioButton(label);
		}
	};

	const handleSelectContacts = (selectedValue) => {
		if (selectedOptions.includes(selectedValue)) {
			setSelectedOptions(selectedOptions.filter((option) => option !== selectedValue));
		} else {
			setSelectedOptions([...selectedOptions, selectedValue]);
		}
	};

	const priorityButtons = [
		{ label: 'Urgent', variant: 'prio-class-urgent', imageSrc: prioUrgent, imageSrcSelected: prioUrgentWhite },
		{ label: 'Medium', variant: 'prio-class-medium', imageSrc: prioMedium, imageSrcSelected: prioMediumWhite },
		{ label: 'Low', variant: 'prio-class-low', imageSrc: prioLow, imageSrcSelected: prioLowWhite },
	];

	const buttons = priorityButtons.map((button) => (
		<Button
			key={button.label}
			variant={selectedPrioButton === button.label ? button.variant : `outline-${button.label.toLowerCase()}`}
			onClick={() => handleClickPrio(button.label)}
			onMouseEnter={() => handleMouseEnter(button.label)}
			onMouseLeave={handleMouseLeave}
		>
			{button.label}
			<img
				className='ms-2'
				src={selectedPrioButton === button.label || isHovered === button.label ? button.imageSrcSelected : button.imageSrc}
				alt=''
			/>
		</Button>
	));

	const handleMouseEnterClearButton = () => {
		setIsClearButtonHovered(true);
	};

	const handleMouseLeaveClearButton = () => {
		setIsClearButtonHovered(false);
	};

	const clearValues = () => {
		setTitle('');
		setDescription('');
		setSelectedOptions([]);
		setDueDate('');
		setSelectedPrioButton('');
		setSelectedCategory('');
		setSubtasks('');
	};

	return (
		<>
			<div className='add-task'>
				<div className='add-task-container'>
					{taskAddedSuccessfully && (
						<Toast
							className='position-absolute bg-success-subtle text-center z-3 text-success fs-3'
							onClose={() => setTaskAddedSuccessfully(false)}
							show={taskAddedSuccessfully}
							delay={3000}
							autohide
						>
							<Toast.Body>Task erfolgreich hinzugefügt!</Toast.Body>
						</Toast>
					)}
					<div className='add-task-position'>
						<h1 className='mb-4'>Add Task</h1>
						<Form noValidate className='position-relative' validated={validated} onSubmit={handleSubmit}>
							<Row className='mb-3 '>
								<Form.Group as={Col} xxl='6' className='pe-lg-4 pe-xl-5 '>
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
										rows={4}
										placeholder='Enter a Description'
										className='mb-3 '
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
									<Form.Label>Assigned to</Form.Label>
									<Dropdown className='cursor-pointer '>
										<Dropdown.Toggle id='dropdown-custom-components'>Select contacts to assign</Dropdown.Toggle>

										<Dropdown.Menu className='py-0'>
											{userList.map((user) => (
												<div
													key={user.id}
													className='contact d-flex align-items-center justify-content-between p-2 '
													onClick={() => handleSelectContacts(user.id)}
												>
													<div className='d-flex align-items-center'>
														<div className='rounded-name-bg' style={{ backgroundColor: '#111111' }}>
															<p className='mb-0'>
																<ShortName userData={user} />
															</p>
														</div>
														<span className='ms-3'>{user.firstname}</span>
														<span className='ms-1'>{user.lastname}</span>
													</div>

													<Form.Check
														type='checkbox'
														id={`dropdown-check-${user.id}`}
														onChange={() => handleSelectContacts(user.id)}
														checked={selectedOptions.includes(user.id)}
													/>
												</div>
											))}
										</Dropdown.Menu>
									</Dropdown>
								</Form.Group>

								<Form.Group as={Col} xxl='6' className='d-flex flex-column pe-lg-4 pe-xl-5 '>
									<Form.Label>Due date</Form.Label>
									<Form.Control
										required
										type='date'
										className='mb-3 '
										value={dueDate}
										onChange={(e) => setDueDate(e.target.value)}
									/>
									<Form.Label>Prio</Form.Label>
									<ButtonGroup className='mb-3 '>{buttons}</ButtonGroup>
									<Form.Label>Category</Form.Label>

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

									<Form.Label>Subtasks</Form.Label>
									<Form.Control
										type='text'
										placeholder='Add new subtask'
										value={subtasks}
										onChange={(e) => setSubtasks(e.target.value)}
									/>
								</Form.Group>
								<div className='d-flex justify-content-end mt-4 pe-lg-4 pe-xl-5'>
									<Button
										className='clear-form-button me-3 me-1'
										onClick={clearValues}
										onMouseEnter={handleMouseEnterClearButton}
										onMouseLeave={handleMouseLeaveClearButton}
										disabled={
											!title &&
											!description &&
											!selectedOptions.length &&
											!dueDate &&
											!selectedPrioButton &&
											!selectedCategory
										}
									>
										Clear
										<img src={isClearButtonHovered ? clearBlueIcon : clearIcon} alt='' />
									</Button>
									<Button
										type='submit'
										className='submit-form-button me-1'
										disabled={
											!(
												title &&
												description &&
												selectedOptions.length &&
												dueDate &&
												selectedPrioButton &&
												selectedCategory
											)
										}
									>
										Create Task
										<img src={checkIcon} alt='' srcSet='' />
									</Button>
								</div>
							</Row>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddTask;
