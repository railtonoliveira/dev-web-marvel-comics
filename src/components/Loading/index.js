import React from 'react';
import './styles.css';
import ReactLoading from 'react-loading';

function Loading() {
	return (
		<div className='container-loading'>
			<ReactLoading type='cylon' color='#E62429' />
		</div>
	);
}

export default Loading;
