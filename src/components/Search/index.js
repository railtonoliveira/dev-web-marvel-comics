import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi';
import Loader from '../Loader';
import useDebounce from '../UseDebounce';

function Search({ loading, onChange, initilize }) {
	const [typeQuery, setTypeQuery] = useState(initilize.query || '');

	let timer;
	const debouncedSearchTerm = useDebounce(typeQuery, 1000);

	useEffect(() => {
		setTypeQuery(initilize.query || '');
		return clearTimeout(timer);
	}, [initilize]);

	useEffect(() => {
		if (debouncedSearchTerm) {
			onChange({
				query: debouncedSearchTerm,
			});
		}
	}, [debouncedSearchTerm]);

	return (
		<div className='container-search'>
			<div className='searchbar' onSubmit={(e) => e.preventDefault()}>
				<input
					className='input-search'
					data-testid='search-searchbar-input'
					onSubmit={(e) => e.preventDefault()}
					onChange={(e) => {
						setTypeQuery(e.target.value);
					}}
					placeholder='Search for a comic title'
					value={typeQuery}
					autoComplete='off'
					spellCheck={false}
				/>
				{loading ? (
					<Loader />
				) : (
					<button type='button' className='button-search' onClick={() => {}}>
						<FiSearch size={24} />
					</button>
				)}
			</div>
		</div>
	);
}

export default Search;
