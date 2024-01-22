import React, { useEffect, useState } from 'react';
import '../scss/board.scss';
import BoardCard from './BoardCard';
import { collection, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import searchIcon from '../assets/icons/search.svg';
import addIcon from '../assets/icons/add.svg';
import AddTaskModal from './AddTaskModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useStrictDroppable from '../utils/useStrictDroppable';

const Board = ({ userData }) => {
	const [todos, setTodos] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const [loading, setLoading] = useState(true);
	const enabled = useStrictDroppable(loading);

	useEffect(() => {
		const todoCollectionRef = collection(db, 'todos');
		/* 		const washingtonRef = doc(db, 'todos'); */

		// Der onSnapshot-Listener wird aufgerufen, wenn sich etwas in der 'todos' Sammlung ändert
		const unsubscribe = onSnapshot(todoCollectionRef, (snapshot) => {
			const newTodos = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			setTodos(newTodos);
			setLoading(false);

		});

		console.log('hi');
		return () => unsubscribe();
	}, []);

	const onDragEnd = async (result) => {
		const { destination, draggableId } = result;

		// Prüfe, ob das Element überhaupt irgendwo abgelegt wurde
		if (!destination) {
			return;
		}

		// Aktualisiere den lokalen Zustand sofort
		const updatedTodos = todos.map((todo) => {
			if (todo.id === draggableId) {
				return { ...todo, status: destination.droppableId };
			}
			return todo;
		});
		setTodos(updatedTodos);

		try {
			const docRef = doc(db, 'todos', draggableId);
			await updateDoc(docRef, {
				status: destination.droppableId,
			});
		} catch (error) {
			console.error('Fehler beim Abrufen des Dokuments: ', error);
			setTodos(todos);
		}
		setLoading(false);
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className='board'>
				<div className='board-container'>
					<div className='row'>
						<div className='d-flex col-12 justify-content-between flex-wrap'>
							<div className='board-position'>
								<h1 className='mb-4'>Board</h1>
							</div>
							<div className='nav-menu-board'>
								<InputGroup className='mb-3'>
									<Form.Control placeholder='Find Task' aria-label='Find Task' aria-describedby='basic-addon2' />
									<Button variant='outline-secondary' id='button-addon2'>
										<img src={searchIcon} alt='' />
									</Button>
								</InputGroup>
								<Button className='text-nowrap' variant='primary' onClick={() => setModalShow(true)}>
									Add Task
									<img className='ms-2 pb-1' src={addIcon} alt='' />
								</Button>
							</div>
						</div>
						<div className='d-flex col-12 justify-content-between'>
							{enabled &&
								['todo', 'progress', 'feedback', 'done'].map((fbId) => (
									<Droppable droppableId={fbId} key={fbId}>
										{(provided, snapshot) => (
											<div className={`d-flex flex-column board-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}>
												<h4>{fbId.charAt(0).toUpperCase() + fbId.slice(1)}</h4>
												<div ref={provided.innerRef} {...provided.droppableProps}>
													{todos.filter((todo) => todo.status === fbId).length > 0 ? (
														todos
															.filter((todo) => todo.status === fbId)
															.map((todo, index) => (
																<Draggable key={todo.id} draggableId={todo.id} index={index}>
																	{(provided) => (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>
																			<BoardCard id={todo.id} userData={userData} />
																		</div>
																	)}
																</Draggable>
															))
													) : (
														<div className='no-task'>
															<p>No tasks {status.charAt(0).toUpperCase() + status.slice(1)}</p>
														</div>
													)}
													{provided.placeholder}
												</div>
											</div>
										)}
									</Droppable>
								))}
						</div>
					</div>
				</div>
				<AddTaskModal show={modalShow} onHide={() => setModalShow(false)} />
			</div>
		</DragDropContext>
	);
};

export default Board;
