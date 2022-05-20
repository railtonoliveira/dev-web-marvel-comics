import React, { useState, useEffect, useLayoutEffect } from 'react';

import './styles.css';
import { getComicResourceByTitleStartsWith } from '../../services/api';
import Gallery from '../Gallery';
import Loading from '../Loading';

function ComicsGallery({ query, handleSelect }) {
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([]);
	const [totalComics, setTotalComics] = useState(0);
	const [index, setIndex] = useState(0);
	const [limit, setlimit] = useState(10);
	const [oldQuery, setOldQuery] = useState({});

	useLayoutEffect(() => {
		setResults([]);
		setIndex(0);
		setlimit(10);
		setTotalComics(0);
		setLoading(false);
	}, [query]);

	useEffect(() => {
		const fetch = async () => {
			if (query?.length >= 3) {
				setLoading(true);

				const response = await getComicResourceByTitleStartsWith(
					query,
					index * limit,
					limit
				);

				const { total } = response || {};

				setTotalComics(total);

				if (oldQuery.query !== query) {
					setResults(response?.results || []);
				} else {
					setResults(results.concat(response?.results || []));
				}

				setLoading(false);
				setOldQuery({ query });

				if (results.length === 1) handleSelect(results[0]);
			}
		};

		fetch();
	}, [index, query]);

	const handleChange = (isNext) => {
		if (isNext) {
			setIndex(index + 1 < totalComics ? index + 1 : index);
		} else {
			setIndex(index > 0 ? index - 1 : 0);
		}
	};

	const galleryData = results.map((result) => ({
		comic: result,
		callback: handleSelect,
	}));

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='container-comics'>
			{query && (
				<div className='info-results'>
					{query.length < 3
						? 'Ops... type minimun 3 characters for a searching'
						: totalComics === 0 && query.length >= 3
						? `Ops... ${totalComics} result found for "${query}"`
						: `All comics for "${query}" in ${totalComics} results`}
				</div>
			)}

			<Gallery comics={galleryData} />

			{index + 1 < totalComics / limit && (
				<button
					type='button'
					className='load-more-button'
					onClick={handleChange}
				>
					LOAD MORE COMICS
				</button>
			)}

			{query && !(totalComics === 0 && query) && (
				<div className='info-pagination'>
					page {index + 1} of {Math.ceil(totalComics / limit)}
				</div>
			)}
		</div>
	);
}

export default ComicsGallery;
