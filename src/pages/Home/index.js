import React, { useState } from 'react';
import './styles.css';

import ComicsGallery from '../../components/ComicsGallery';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Search from '../../components/Search';

function Home() {
	const [queryData, setQueryData] = useState({ query: '' });
	const [isOpen, setIsOpen] = useState(false);
	const [comicImage, setComicImage] = useState('');
	const [comicTitle, setComicTitle] = useState('');
	const [comicDatePublished, setComicDatePublished] = useState('');
	const [comicWriter, setComicWriter] = useState('');
	const [comicPenciler, setComicPenciler] = useState('');
	const [comicColorist, setComicColorist] = useState('');
	const [comicDescription, setComicDescription] = useState('');

	const { query } = queryData;

	const handleSearch = (search) => {
		setQueryData(search);
	};

	const handleSelect = (comic) => {
		const date = new Date(comic.dates[1].date).toLocaleDateString('pt-BR');
		const comicCreators = comic.creators;
		const writers = comicCreators.filter((writer) => writer.role === 'writer');
		const pencilers = comicCreators.filter(
			(penciler) =>
				penciler.role === 'penciler (cover)' || penciler.role === 'penciler'
		);
		const colorists = comicCreators.filter(
			(colorist) =>
				colorist.role === 'colorist (cover)' || colorist.role === 'colorist'
		);

		setComicImage(comic.thumbnail?.path);
		setComicTitle(comic.title);
		setComicDatePublished(date);
		setComicWriter(writers[0]?.name);
		setComicPenciler(pencilers[0]?.name);
		setComicColorist(colorists[0]?.name);
		setComicDescription(comic.description);
		setIsOpen(true);
	};

	return (
		<div className='container-home'>
			{isOpen && (
				<Modal
					setIsOpen={setIsOpen}
					comicImage={comicImage}
					comicTitle={comicTitle}
					comicDatePublished={comicDatePublished}
					comicWriter={comicWriter}
					comicPenciler={comicPenciler}
					comicColorist={comicColorist}
					comicDescription={comicDescription}
				/>
			)}
			<Header />
			<Search handleSearch={handleSearch} />
			<ComicsGallery query={query} handleSelect={handleSelect} />
			<Footer />
		</div>
	);
}

export default Home;
