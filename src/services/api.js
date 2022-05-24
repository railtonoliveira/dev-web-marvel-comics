import axios from 'axios';

const ts = 1;
const apikey = '63157990977e4a19a20673f91fb09066';
const hash = '22118943eb447b37a55d5c367056c87a';

export const api = axios.create({
	baseURL: 'https://gateway.marvel.com/v1/public',
	timeout: false,
	params: {
		ts,
		apikey,
		hash,
	},
});

api.interceptors.request.use(
	(response) => response,
	(error) => {
		console.log(error.message);
		return error;
	}
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error.message);
		return error;
	}
);

export const getComicByTitleStartsWith = async (title, offset, limit) => {
	const url = `comics?titleStartsWith=${title}&offset=${offset}&limit=${limit}`;

	return api.get(url);
};

export const getComicResourceByTitleStartsWith = async (
	query,
	_offset,
	_limit
) => {
	try {
		const response = await getComicByTitleStartsWith(query, _offset, _limit);
		const { offset, limit, total, count } = response.data.data;
		const list = response.data.data.results;

		const comicList = list.map(
			({
				id,
				description = '',
				images,
				thumbnail,
				creators,
				characters,
				dates,
				pageCount,
				title,
				urls = {},
			}) => ({
				id,
				description,
				images,
				thumbnail,
				creators: creators.items,
				characters: characters.items,
				dates,
				pageCount,
				title,
				urls: urls.items,
			})
		);
		return {
			results: [...comicList],
			offset,
			limit,
			total,
			count,
		};
	} catch (err) {
		return console.log(err);
	}
};
