import React, {
  useState, useEffect, useContext, useRef,
} from 'react';
import './styles.css';
import emailjs from '@emailjs/browser';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Search from '../../components/Search';
import ComicsGallery from '../../components/ComicsGallery';
import Store from '../../context/provider';

function Home() {
  const [initilize, setInitialize] = useState({});
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [creatorsList, setCreatorsList] = useState([]);
  const [query, setQuery] = useState({
    query: '',
    filter: '',
    queryIsId: false,
  });

  const form = useRef();

  const store = useContext(Store);

  useEffect(() => {
    const comicId = getComicIdByQueryUrl(getUrlParams());
    setSearchInitialize(comicId);
  }, []);

  const getUrlParams = () => {
    const params = decodeURI(window.location.search)
      ?.replace('?', '')
      ?.split('&')
      ?.map((query) => ({ [query.split('=')[0]]: query.split('=')[1] }))
      ?.reduce((acc, query) => {
        acc = {
          ...acc,
          ...query,
        };
        return acc;
      }, {});

    return params;
  };

  const getComicIdByQueryUrl = (query) => query.comicId;

  const setSearchInitialize = (comic) => {
    let query;
    let filter;

    if (comic) {
      query = comic;
      filter = 'COMICS';
    }

    setInitialize({ query, filter });
    !!query && setLoading(true);
  };

  const onSearchChange = (search) => {
    setQuery(search);
    setLoading(`${search.query}`.length >= 3);
  };

  /* const handleSelect = (selected) => {
        console.log("Selecionou: ", selected)
        setSelected(selected);
        store.dispatchSelected(selected);
        return;
    }; */

  const handleSelect = (comic) => {
    setSelected(comic);
    console.log('selected: ', selected);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const descriptionComic = selected.description === null ? 'No description' : selected.description;
    const listCreators = selected.creators;

    Object.keys(listCreators).forEach((item) => {
      creatorsList.push(`${listCreators[item].name} - ${listCreators[item].role}`);
    });

    const comicData = {
      title: selected.title,
      image: selected.thumbnail.path,
      description: descriptionComic,
      creators: creatorsList.toString().replace(/,/g, ' | '),
    };

    emailjs.send('gmail', 'marvel-comics', comicData, 'N3F_iu1CAo82W__zf')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
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
        {...query}
        handleSelect={handleSelect}
        onSearchEnd={onSearchEnd}
        sendEmail={sendEmail}
      />
      <Footer />
    </div>
  );
}

export default Home;
