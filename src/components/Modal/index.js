import React from 'react';
import './styles.css';
import { RiCloseLine } from 'react-icons/ri';

function Modal({ setIsOpen, comicData }) {
	return (
		<div>
			<div
				className='dark-background'
				onClick={() => setIsOpen(false)}
				aria-hidden='true'
			>
				<div className='centered'>
					<div className='modal'>
						<div className='modal-header'>
							<h3 className='heading'>{comicData?.title}</h3>
						</div>
						<div className='information'>
							<img
								src={`${comicData?.thumbnail?.path}/standard_fantastic.jpg`}
								alt={comicData?.title}
								width='300px'
							/>
							<div className='details'>
								<h3>Published:</h3>
								<h3>Writer:</h3>
								<h3>Penciler:</h3>
								<h3>Cover Artist:</h3>
								<p>{comicData?.description}</p>
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
		</div>
	);
}

export default Modal;
