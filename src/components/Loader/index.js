import React from 'react';
import './styles.css';

function Loader() {
	return (
		<div className='container-loader'>
			<div className='load' data-testid='loader-load-div' />
		</div>
	);
}

export default Loader;
