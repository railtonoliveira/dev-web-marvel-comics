import React from 'react';
import './styles.css';
import Logo from '../../assets/logo.png';

function Header() {
	return (
		<div className='nav'>
			<img src={Logo} alt='logo' width='100' />
		</div>
	);
}

export default Header;
