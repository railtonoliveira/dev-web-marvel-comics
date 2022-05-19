import emailjs from '@emailjs/browser';
import React, { useState, useEffect } from 'react';
import './styles.css';

import ComicsGallery from '../../components/ComicsGallery';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Search from '../../components/Search';

function Home() {
	const [initilize, setInitialize] = useState({});
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState([]);
	const [queryData, setQueryData] = useState({
		query: '',
		filter: '',
		queryIsId: false,
	});
	const creatorsList = [];

	const { query } = queryData;

	useEffect(() => {
		const comicId = getComicIdByQueryUrl(getUrlParams());
		searchInitialize(comicId);
	}, []);

	const getUrlParams = () => {
		const params = decodeURI(window.location.search)
			?.replace('?', '')
			?.split('&')
			?.map((urlQuery) => ({
				[urlQuery.split('=')[0]]: urlQuery.split('=')[1],
			}))
			?.reduce((acc, urlQuery) => {
				const data = {
					...acc,
					...urlQuery,
				};
				return data;
			}, {});

		return params;
	};

	const getComicIdByQueryUrl = (value) => value.comicId;

	const searchInitialize = (comic) => {
		let initialQuery;
		let filter;

		if (comic) {
			initialQuery = comic;
			filter = 'COMICS';
		}

		setInitialize({ initialQuery, filter });

		return !!initialQuery && setLoading(true);
	};

	const onSearchChange = (search) => {
		setQueryData(search);
		setLoading(`${search.query}`.length >= 3);
	};

	const handleSelect = (comic) => {
		setSelected(comic);
		console.log('selected: ', selected);
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

	const onSearchEnd = () => {
		setLoading(false);
	};

	return (
		<div>
			<Header />
			<Search
				onChange={onSearchChange}
				loading={loading}
				initilize={initilize}
			/>
			<ComicsGallery
				query={query}
				onSearchEnd={onSearchEnd}
				handleSelect={handleSelect}
				sendEmail={sendEmail}
			/>
			<Footer />
		</div>
	);
}

export default Home;
