import React, { useEffect, useState } from 'react';
import '../scss/board.scss';
import BoardCard from './BoardCard';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './Firebase';

const Board = ({ userData }) => {
	const [todos, setTodos] = useState([]);

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
				<div>
					<div className='board-position'>
						<h1 className='mb-4'>Board</h1>
					</div>
					<div>
						<p>find task</p>
						<button>Add task</button>
					</div>
				</div>
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
	);
};

export default Board;
