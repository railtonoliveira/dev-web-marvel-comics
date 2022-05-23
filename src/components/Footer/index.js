import React from 'react';

import './styles.css';
import Instagram from '../../assets/instagram.png';
import Linkedin from '../../assets/linkedin.png';
import Twitter from '../../assets/twitter.png';

function Footer() {
	return (
		<div className='footer'>
			<div className='social-media-icons'>
				<div className='icon'>
					<a
						href='https://www.instagram.com/railtonods/'
						target='_blank'
						rel='noreferrer'
					>
						<img src={Instagram} alt='instagram' width='40' height='40' />
					</a>
				</div>
				<div className='icon'>
					<a
						href='https://twitter.com/railtonods'
						target='_blank'
						rel='noreferrer'
					>
						<img src={Twitter} alt='twitter' width='40' height='40' />
					</a>
				</div>
				<div className='icon'>
					<a
						href='https://www.linkedin.com/in/railton-oliveira-26623b116/'
						target='_blank'
						rel='noreferrer'
					>
						<img src={Linkedin} alt='linkedin' width='40' height='40' />
					</a>
				</div>
			</div>
			<h3 className='developer'>Developed by: Railton Oliveira</h3>
		</div>
	);
}

export default Footer;
