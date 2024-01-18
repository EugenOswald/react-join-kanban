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

const Board = ({ userData }) => {
	const [todos, setTodos] = useState([]);
	const [modalShow, setModalShow] = React.useState(false);

	useEffect(() => {
		const fetchTodos = async () => {
			const todoCollectionRef = collection(db, 'todos');
			const data = await getDocs(todoCollectionRef);
			setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};

		fetchTodos();
	}, []);

	return (
		<div className='board'>
			<div className='board-container'>
				<div className='row'>
					<div className='d-flex col-12'>
						<div className='board-position'>
							<h1 className='mb-4'>Board</h1>
						</div>
						<div className='nav-menu-board'>
							<InputGroup className='mb-3'>
								<Form.Control placeholder='Find Task' aria-label='Find Task' aria-describedby='basic-addon2' />
								<Button variant='outline-secondary' id='button-addon2'>
									<img src={searchIcon} alt='' srcset='' />
								</Button>
							</InputGroup>
							<Button className='text-nowrap' variant='primary' onClick={() => setModalShow(true)}>
								Add Task
								<img className='ms-2 pb-1' src={addIcon} alt='' srcset='' />
							</Button>
						</div>
					</div>
					<div className='d-flex col-12'>
						<div>
							<div className='d-flex flex-column'>
								<h4>To do</h4>
								<div>
									{todos.filter((todo) => todo.status === 'todo').length > 0 ? (
										todos
											.filter((todo) => todo.status === 'todo')
											.map((todo) => <BoardCard key={todo.id} todo={todo} userData={userData} />)
									) : (
										<div>
											<p>Keine Todos</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className='d-flex flex-column'>
								<h4>In porogress</h4>
								<div>
									{todos.filter((todo) => todo.status === 'porogress').length > 0 ? (
										todos
											.filter((todo) => todo.status === 'porogress')
											.map((todo) => <BoardCard key={todo.id} todo={todo} userData={userData} />)
									) : (
										<div>
											<p>Keine Todos</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className='d-flex flex-column'>
								<h4>Await feedback</h4>
								<div>
									{todos.filter((todo) => todo.status === 'feedback').length > 0 ? (
										todos
											.filter((todo) => todo.status === 'feedback')
											.map((todo) => <BoardCard key={todo.id} todo={todo} userData={userData} />)
									) : (
										<div>
											<p>Keine Todos</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className='d-flex flex-column'>
								<h4>Done</h4>
								<div>
									{todos.filter((todo) => todo.status === 'done').length > 0 ? (
										todos
											.filter((todo) => todo.status === 'done')
											.map((todo) => <BoardCard key={todo.id} todo={todo} userData={userData} />)
									) : (
										<div>
											<p>Keine Todos</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<AddTaskModal show={modalShow} onHide={() => setModalShow(false)} />
		</div>
	);
};

export default Board;
