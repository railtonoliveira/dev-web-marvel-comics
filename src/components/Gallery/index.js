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
						src={`${comic?.thumbnail?.path}/standard_fantastic.jpg`}
						alt={comic?.title}
					/>
					<h4>{comic?.title}</h4>
				</div>
			))}
		</div>
	);
}

export default Gallery;
