import React from 'react';
import '../scss/board.scss';

const Board = ({ userData }) => {
	return (
		<div className='board'>
			<div className='board-container'>
				<div className='board-position'>
					<h1 className='mb-4'>Board</h1>
				</div>
			</div>
		</div>
	);
};

export default Board;
