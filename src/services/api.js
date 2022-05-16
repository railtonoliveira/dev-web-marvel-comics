import axios from "axios";

const ts = 1;
const apikey = "63157990977e4a19a20673f91fb09066";
const hash = "22118943eb447b37a55d5c367056c87a";

export const api = axios.create({
    baseURL: "https://gateway.marvel.com/v1/public",
    timeout: false,
    params: {
        ts,
        apikey,
        hash 
    }
});

api.interceptors.request.use((response) => response, (error) => {
    console.log(error.message)
    return error
})

api.interceptors.response.use((response) => response, (error) => {
    console.log(error.message)
    return error
})

export const getComicByUrl = async (resourceUrl) => {
    return api.get(resourceUrl);
}

export const getComicByTitleStartsWith = async (title, offset, limit) => {
    let url = `comics?titleStartsWith=${title}&offset=${offset}&limit=${limit}`

    return api.get(url);
}

export const getComicResourceByTitleStartsWith = async (
    title,
    _offset,
    _limit
) => {
    try {
        const response = await getComicByTitleStartsWith(title, _offset, _limit); 
        const { offset, limit, total, count } = response.data.data;
        const list = response.data.data.results;

        let comicList = list.map(
            ({ 
                id, 
                description = "", 
                images, 
                thumbnail, 
                creators, 
                characters, 
                dates, 
                pageCount, 
                title, 
                urls = {} 
            }) => {
                return {
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
                };
            }
        );
        return {
            results: [...comicList],
            offset,
            limit,
            total,
            count
        };
    } catch (err) {
        console.log(err);
    }
}

export const getComicByResourceUrl = async (resourceUrl) => {
    try {
        const response = await getComicByUrl(resourceUrl);

        const {
            name,
            comics,
            description,
            images,
            thumbnail,
            creators,
            characters,
            dates,
            pageCount,
            urls = {}
        } = response.data.data.results[0];

        return {
            name,
            comics: comics.items,
            series: comics.series,
            description,
            images,
            thumbnail,
            creators: creators.items,
            characters: characters.items,
            dates,
            pageCount,
            urls: urls.items
        };
    } catch (err) {
        console.log(err);
    }
}