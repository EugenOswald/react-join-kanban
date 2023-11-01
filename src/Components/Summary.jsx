import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Card } from 'react-bootstrap';
import prioUrgent from '../assets/icons/prio-urgent.svg';
import '../scss/summary.scss';

const Summary = (/* { userData } */) => {
	const [todoList, setTodoList] = useState([]);
	const [highPrioCount, setHighPrioCount] = useState(0);
	const [nextUrgentDate, setNextUrgentDate] = useState(null);

	const todoCollectionRef = collection(db, 'todos');

	useEffect(() => {
		const getTodoList = async () => {
			//Read the Data
			//Set the Todolist
			try {
				const data = await getDocs(todoCollectionRef);
				const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

				setTodoList(filteredData);

				const urgentTodos = filteredData.filter((todo) => todo.prio === 'urgent');
				setHighPrioCount(urgentTodos.length);

				const nextUrgentDate = urgentTodos.reduce((earliest, todo) => {
					const [day, month, year] = todo.date.split('.').map(Number);
					const todoDate = new Date(year, month - 1, day);
					return !earliest || todoDate < earliest ? todoDate : earliest;
				}, null);

				if (nextUrgentDate) {
					setNextUrgentDate(nextUrgentDate);
				}
			} catch (err) {
				console.error(err);
			}
		};

		getTodoList();
	}, []);
	return (
		<div className='summary'>
			<div className='summary-container'>
				<div className='summary-position'>
					<div className='d-flex margin-bottom'>
						<Card className='card-layout card-todo'>
							<div className='rounded-urgent'>
								<img src={prioUrgent} alt='' />
							</div>
							<div>
								<p className='bold-number text-center'>{todoList.length}</p>
								<p className='text-center'>To-do</p>
							</div>
						</Card>
						<Card className='card-layout card-todo'>
							<div className='rounded-urgent'>
								<img src={prioUrgent} alt='' />
							</div>
							<div>
								<p className='bold-number text-center'>{todoList.length}</p>
								<p>Done</p>
							</div>
						</Card>
					</div>

					<div className='d-flex margin-bottom'>
						<Card className='card-layout card-urgent'>
							<div className='d-flex'>
								<div className='d-flex flex-column align-items-center'>
									<div className='rounded-urgent'>
										<img src={prioUrgent} alt='' />
									</div>
									<div className='d-flex flex-column align-items-center'>
										<p className='bold-number text-center'>{highPrioCount}</p>
										<p>Urgent</p>
									</div>
								</div>
								<div className='d-flex flex-column align-items-center'>
									<p>{nextUrgentDate ? nextUrgentDate.toLocaleDateString() : 'Kein Datum'}</p>
									<p>Upcoming Deadline</p>
								</div>
							</div>
						</Card>
					</div>
					<div className='d-flex margin-bottom'>
						<Card className='card-layout card-progress'>
							<div className='d-flex flex-column align-items-center'>
								<p className='bold-number text-center'>{todoList.length}</p>
								<p className='text-center'>Tasks in Board</p>
							</div>
						</Card>
						<Card className='card-layout card-progress'>
							<div className='d-flex flex-column align-items-center'>
								<p className='bold-number text-center'>{todoList.length}</p>
								<p className='text-center'>Tasks In Progress</p>
							</div>
						</Card>
						<Card className='card-layout card-progress'>
							<div className='d-flex flex-column align-items-center'>
								<p className='bold-number text-center'>{todoList.length}</p>
								<p className='text-center'>Awaiting Feedback</p>
							</div>
						</Card>
					</div>
					<p>
						Good morning, {userData.firstname} {userData.lastname}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Summary;
