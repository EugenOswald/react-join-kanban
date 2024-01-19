import React, { useEffect, useState } from 'react';
import '../scss/board.scss';
import BoardCard from './BoardCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import searchIcon from '../assets/icons/search.svg';
import addIcon from '../assets/icons/add.svg';
import AddTaskModal from './AddTaskModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useStrictDroppable from '../utils/useStrictDroppable'

const Board = ({ userData }) => {
	const [todos, setTodos] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);
	const [loading, setLoading] = useState(true);
	const enabled = useStrictDroppable(loading);

	useEffect(() => {
		const fetchTodos = async () => {
			const todoCollectionRef = collection(db, 'todos');
			const data = await getDocs(todoCollectionRef);
			setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			setLoading(false);
		};
		console.log('Fetching Todos...');
		fetchTodos();
	}, []);

	const onDragEnd = (result) => {
		console.log('Drag Ended:', result);
	};

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
								['todo', 'progress', 'feedback', 'done'].map((status) => (
									<Droppable droppableId={status} key={status}>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												{...provided.droppableProps}
												className={`d-flex flex-column board-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
											>
												<h4>{status.charAt(0).toUpperCase() + status.slice(1)}</h4>
												<div>
													{todos.filter((todo) => todo.status === status).length > 0 ? (
														todos
															.filter((todo) => todo.status === status)
															.map((todo, index) => (
																<Draggable key={todo.id} draggableId={todo.id} index={index}>
																	{(provided) => (
																		<div
																			ref={provided.innerRef}
																			{...provided.draggableProps}
																			{...provided.dragHandleProps}
																		>
																			<BoardCard todo={todo} userData={userData} />
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
