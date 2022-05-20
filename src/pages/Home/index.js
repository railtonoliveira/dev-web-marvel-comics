import React, { useState } from 'react';
import './styles.css';

import ComicsGallery from '../../components/ComicsGallery';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Search from '../../components/Search';

function Home() {
	const [selected, setSelected] = useState([]);
	const [queryData, setQueryData] = useState({ query: '' });

	const { query } = queryData;

	const handleSearch = (search) => {
		setQueryData(search);
	};

	const handleSelect = (comic) => {
		setSelected(comic);
		console.log('Comic Selected: ', selected);
	};

	return (
		<div>
			<Header />
			<Search handleSearch={handleSearch} />
			<ComicsGallery query={query} handleSelect={handleSelect} />
			<Footer />
		</div>
	);
}

export default Home;
