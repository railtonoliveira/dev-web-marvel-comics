import React from 'react';
import './styles.css';

function Gallery({ comics }) {
	return (
		<div className='container-gallery'>
			{comics?.map(({ comic, callback }) => (
				<div
					aria-hidden='true'
					className='comic-card'
					key={comic?.id}
					onClick={() => callback(comic)}
				>
					<img
						className='blur'
						src={`${comic?.thumbnail?.path}/standard_fantastic.jpg`}
						alt={comic?.title}
					/>
					<div className='comic-info slide-up'>
						<div className='comic-title'>{comic?.title}</div>
						<div className='comic-details'>View Details</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Gallery;
