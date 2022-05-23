import React, { useState } from 'react';
import './styles.css';

import ComicsGallery from '../../components/ComicsGallery';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Search from '../../components/Search';

function Home() {
	const [selected, setSelected] = useState([]);
	const [queryData, setQueryData] = useState({ query: '' });
	const [isOpen, setIsOpen] = useState(false);

	const { query } = queryData;

	const handleSearch = (search) => {
		setQueryData(search);
	};

	const handleSelect = (comic) => {
		setSelected(comic);
		console.log('Comic Selected: ', selected);
		setIsOpen(true);
	};

	return (
		<div className='container-home'>
			{isOpen && <Modal setIsOpen={setIsOpen} comicData={selected} />}
			<Header />
			<Search handleSearch={handleSearch} />
			<ComicsGallery query={query} handleSelect={handleSelect} />
			<Footer />
		</div>
	);
}

export default Home;
