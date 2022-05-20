import React, { useEffect, useState } from 'react';
import './styles.css';
import { FiSearch } from 'react-icons/fi';

import useDebounce from '../../hooks/UseDebounce';

function Search({ handleSearch }) {
	const [typeQuery, setTypeQuery] = useState('');

	const debouncedSearch = useDebounce(typeQuery, 1000);

	useEffect(() => {
		if (debouncedSearch) {
			handleSearch({
				query: debouncedSearch,
			});
		}
	}, [debouncedSearch]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setTypeQuery(e.target.value);
	};

	return (
		<div className='container-search'>
			<div className='searchbar'>
				<input
					className='input-search'
					onSubmit={handleSubmit}
					onChange={handleChange}
					placeholder='Enter a heros name'
					value={typeQuery}
					autoComplete='off'
					spellCheck={false}
				/>
				<button type='button' className='button-search'>
					<FiSearch size={24} />
				</button>
			</div>
		</div>
	);
}

export default Search;
