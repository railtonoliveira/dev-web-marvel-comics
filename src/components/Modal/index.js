import React from 'react';
import './styles.css';
import { RiCloseLine } from 'react-icons/ri';

function Modal({
	setIsOpen,
	comicImage,
	comicTitle,
	comicDatePublished,
	comicWriter,
	comicPenciler,
	comicColorist,
	comicDescription,
}) {
	return (
		<div>
			<div
				className='modal-container'
				onClick={() => setIsOpen(false)}
				aria-hidden='true'
			>
				<div className='modal'>
					<div className='modal-body'>
						<img
							src={`${comicImage}/standard_fantastic.jpg`}
							alt={comicTitle}
							width='300px'
						/>
						<div className='details'>
							<h3>Title: {comicTitle}</h3>
							<h3>Published: {comicDatePublished}</h3>
							{comicWriter && <h3>Writer: {comicWriter}</h3>}
							{comicPenciler && <h3>Penciler: {comicPenciler}</h3>}
							{comicColorist && <h3>Colorist: {comicColorist}</h3>}
							<p>{comicDescription}</p>
						</div>
					</div>
					<button
						className='close-btn'
						onClick={() => setIsOpen(false)}
						type='button'
					>
						<RiCloseLine />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
