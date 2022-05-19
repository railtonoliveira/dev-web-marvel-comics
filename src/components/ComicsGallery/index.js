import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styles.css';
import Gallery from '../Gallery';
import { getComicResourceByTitleStartsWith } from '../../services/api';

function ComicsGallery({ query, onSearchEnd, handleSelect, sendEmail }) {
	const [results, setResults] = useState([]);
	const [totalComics, setTotalComics] = useState(0);
	const [index, setIndex] = useState(0);
	const [limit, setlimit] = useState(10);
	const [loading, setLoading] = useState(false);
	const [newQuery, setNewQuery] = useState({});

	useLayoutEffect(() => {
		setResults([]);
		setIndex(0);
		setlimit(10);
		setTotalComics(0);
		setLoading(false);
	}, [query]);

	useEffect(() => {
		let isSubscribed = true;

		const fetch = async () => {
			if (query.length >= 3) {
				setLoading(true);

				const response = await getComicResourceByTitleStartsWith(
					query,
					index * limit,
					limit
				);

				const { total = 0 } = response || {};

				if (isSubscribed) {
					onSearchEnd();
					setTotalComics(total);

					if (newQuery.query !== query) {
						setResults(response?.results || []);
					} else {
						setResults(results.concat(response?.results || []));
					}

					setLoading(false);
					setNewQuery({ query });
				}

				if (results.length === 1) handleSelect(results[0]);
			}
		};

		fetch();

		return () => {
			isSubscribed = false;
		};
	}, [index, query]);

	const handleChange = (isNext) => {
		if (isNext) {
			setIndex(index + 1 < totalComics ? index + 1 : index);
		} else {
			setIndex(index > 0 ? index - 1 : 0);
		}
	};

	if (loading) {
		return <div>loading</div>;
	}

	return (
		<div className='container-comics'>
			<div>
				{query && (
					<div className='info-pagination'>
						{query.length < 3
							? 'Ops... type minimun 3 characters for a searching'
							: totalComics === 0 && query.length >= 3
							? `Ops... ${totalComics} result found for "${query}"`
							: `All comics for "${query}" in ${totalComics} results`}
					</div>
				)}
			</div>
			<div className='gallery-comics'>
				<Gallery
					comics={results.map((result) => ({
						comic: result,
						callback: handleSelect,
					}))}
				/>
			</div>
			<div className='content-buttons'>
				{index + 1 < totalComics / limit && (
					<div>
						<button
							type='button'
							className='load-more-button'
							onClick={handleChange}
						>
							LOAD MORE COMICS
						</button>
						<button type='button' className='send-email' onClick={sendEmail}>
							SEND COMICS BY EMAIL
						</button>
					</div>
				)}
			</div>
			<div>
				{query && !(totalComics === 0 && query) && (
					<div className='info-pagination'>
						page {index + 1} of {Math.ceil(totalComics / limit)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ComicsGallery;
