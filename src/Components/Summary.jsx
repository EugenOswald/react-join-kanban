import React, { useEffect, useState } from 'react';
import { db } from './Firebase';
import { getDocs, collection } from 'firebase/firestore';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import checkIconGray from '../assets/icons/check-icon-gray.svg';
import penIconGray from '../assets/icons/pen-icon-gray.svg';
import prioUrgent from '../assets/icons/prio-urgent-white.svg';
import '../scss/summary.scss';

const Summary = React.memo(({ userData }) => {
	const [todoList, setTodoList] = useState([]);
	const [highPrioCount, setHighPrioCount] = useState(0);
	const [todoTodosCount, setTodoTodosCount] = useState(0);
	const [progressTodosCount, setProgressTodosCount] = useState(0);
	const [feedbackTodos, setFeedbackTodos] = useState(0);
	const [doneTodos, setDoneTodos] = useState(0);
	const [nextUrgentDate, setNextUrgentDate] = useState(null);

	const todoCollectionRef = collection(db, 'todos');

	useEffect(() => {
		const getTodoList = async () => {
			try {
				const data = await getDocs(todoCollectionRef);
				const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
				setTodoList(filteredData);
				const todoTodos = filteredData.filter((todo) => todo.status === 'todo');
				const progressTodos = filteredData.filter((todo) => todo.status === 'progress');
				const feedbackTodos = filteredData.filter((todo) => todo.status === 'feedback');
				const doneTodos = filteredData.filter((todo) => todo.status === 'done');
				const urgentTodos = filteredData.filter((todo) => todo.prio === 'Urgent');
                setTodoTodosCount(todoTodos.length);
                setProgressTodosCount(progressTodos.length);
                setFeedbackTodos(feedbackTodos.length);
                setDoneTodos(doneTodos.length);

				const nextUrgentDate = urgentTodos.reduce((earliest, todo) => {
					const [year, month, day] = todo.dueDate.split('-').map(Number);
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
			<div className='summary-container px-5'>
				<div className='summary-position'>
					<div className='d-flex justify-content-start align-items-center ps-2'>
						<h1>Join 360</h1>
						<div className='separating-line mx-4'></div>
						<p className=' text-center mb-0'>Key Metrics at a Glance</p>
					</div>

					<Container className='d-flex align-items-center'>
						<div className='bootstrap-react me-0 me-xl-2'>
							<div className='d-flex margin-bottom'>
								<Card className='card-layout card-todo'>
									<div className=''>
										<img src={penIconGray} alt='' />
									</div>
									<div className='d-flex flex-column align-items-center'>
										<p className='bold-number text-center'>{todoTodosCount}</p>
										<p className='text-center'>To-do</p>
									</div>
								</Card>
								<Card className='card-layout card-todo'>
									<div className=''>
										<img src={checkIconGray} alt='' />
									</div>
									<div>
										<p className='bold-number text-center'>{doneTodos}</p>
										<p>Done</p>
									</div>
								</Card>
							</div>

							<div className='d-flex margin-bottom'>
								<Card className='card-layout card-urgent'>
									<div className='d-flex align-items-center'>
										<div className='d-flex flex-row align-items-center gap-18'>
											<div className='rounded-urgent'>
												<img className='urgent-icon' src={prioUrgent} alt='' />
											</div>
											<div className='d-flex flex-column align-items-center'>
												<p className='bold-number text-center'>{highPrioCount}</p>
												<p>Urgent</p>
											</div>
										</div>
										<div className='gray-line mx-5'></div>
										<div className='d-flex flex-column align-items-start'>
											<p className='bold-date mb-0'>
												{nextUrgentDate ? nextUrgentDate.toLocaleDateString() : 'Kein Datum'}
											</p>
											<p className=' mb-0'>Upcoming Deadline</p>
										</div>
									</div>
								</Card>
							</div>
							<div className='d-flex margin-bottom'>
								<Card className='card-layout card-progress'>
									<div className='d-flex flex-column align-items-center'>
										<p className='bold-number text-center'>{todoList.length}</p>
										<p className='text-center'>
											Tasks in <br></br> Board
										</p>
									</div>
								</Card>
								<Card className='card-layout card-progress'>
									<div className='d-flex flex-column align-items-center'>
										<p className='bold-number text-center'>{progressTodosCount}</p>
										<p className='text-center'>
											Tasks In<br></br> Progress
										</p>
									</div>
								</Card>
								<Card className='card-layout card-progress'>
									<div className='d-flex flex-column align-items-center'>
										<p className='bold-number text-center'>{feedbackTodos}</p>
										<p className='text-center'>
											Awaiting<br></br> Feedback
										</p>
									</div>
								</Card>
							</div>
						</div>
						<div className='d-none d-xl-flex ms-5'>
							<p className='summary-hello'>
								Hello,
								<span className='color-secondary'>
									{userData.firstname} {userData.lastname}
								</span>
							</p>
						</div>
					</Container>
				</div>
			</div>
		</div>
	);
});

export default Summary;
