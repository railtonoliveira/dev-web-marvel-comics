import React, { useState, useEffect, useLayoutEffect } from "react";
import "./styles.css";
import Gallery from "../Gallery";
import { getComicResourceByTitleStartsWith } from "../../services/api";

const ComicsGallery = ({ query, onSearchEnd, handleSelect, sendEmail }) => {

    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(0);
    const [index, setIndex] = useState(0);
    const [limit, setlimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [newQuery, setNewQuery] = useState({});

    useLayoutEffect(() => {
        setResults([]);
        setIndex(0);
        setlimit(10);
        setTotal(0);
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

                const { total = 0 } = response ||  {};

                if (isSubscribed) {
                    onSearchEnd();
                    setTotal(total);

                    if (newQuery.query !== query) {
                        setResults(response?.results || []);
                    } else {
                        setResults(results.concat(response?.results || []));
                    }
                    
                    setLoading(false);
                    setNewQuery({query})
                }

                if (results.length === 1) handleSelect(results[0]);
            }
        };

        fetch();

        return () => (isSubscribed = false);

    }, [index, query])

    const handleChange = (isNext) => {
        if (isNext) {
          setIndex(index + 1 < total ? index + 1 : index);
        } else {
          setIndex(index > 0 ? index - 1 : 0);
        }
    };

    return (
        <div className="container-comics">
            <div>
                {query && (
                    <div className="info-pagination">
                        {query.length < 3
                        ? "Ops... type minimun 3 characters for a searching"
                        : total === 0 && query.length >= 3
                        ? `Ops... ${total} result found for "${query}"`
                        : `All comics for "${query}" in ${total} results`}
                    </div>
                )}
            </div>
            <div className="gallery-comics">
                <Gallery
                    items={results.map((result) => ({
                        comic: result,
                        callback: handleSelect,
                    }))}
                />
            </div>
            <div className="content-buttons">
                {index + 1 < total / limit && (
                    <div>
                        <button className="load-more-button" onClick={handleChange}>
                            LOAD MORE COMICS
                        </button>
                        <button className="send-email" onClick={sendEmail}>
                            SEND COMICS BY EMAIL
                        </button>
                    </div>
                )}
            </div>
            <div>
                {query && !(total === 0 && query) && (
                    <div className="info-pagination">
                        page {index + 1} of {Math.ceil(total / limit)}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ComicsGallery;