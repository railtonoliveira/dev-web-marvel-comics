import emailjs from '@emailjs/browser';
import React, { useState } from 'react';
import './styles.css';

import ComicsGallery from '../../components/ComicsGallery';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Search from '../../components/Search';

function Home() {
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [queryData, setQueryData] = useState({ query: '' });

	const creatorsList = [];
	const { query } = queryData;

	const onSearchChange = (search) => {
		setQueryData(search);
		setLoading(true);
	};

	const handleSelect = (comic) => {
		setSelected(comic);
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const descriptionComic =
			selected.description === null ? 'No description' : selected.description;
		const listCreators = selected.creators;

		Object.keys(listCreators).forEach((item) => {
			creatorsList.push(
				`${listCreators[item].name} - ${listCreators[item].role}`
			);
		});

		const comicData = {
			title: selected.title,
			image: selected.thumbnail.path,
			description: descriptionComic,
			creators: creatorsList.toString().replace(/,/g, ' | '),
		};

		emailjs.send('gmail', 'marvel-comics', comicData, 'N3F_iu1CAo82W__zf').then(
			(result) => {
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<div>
			<Header />
			<Search onChange={onSearchChange} loading={loading} />
			<ComicsGallery
				query={query}
				handleSelect={handleSelect}
				sendEmail={sendEmail}
			/>
			<Footer />
		</div>
	);
}

export default Home;
