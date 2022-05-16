import React, { useEffect, useState } from "react";
import "./styles.css";
import { FiSearch } from "react-icons/fi";
import Loader from "../Loader";
import useDebounce from "../UseDebounce";

const Search = ({ loading, onChange, initilize }) => {

    const [query, setQuery] = useState(initilize.query || "");

    let timer;
    const debouncedSearchTerm = useDebounce(query, 1000);

    useEffect(() => {
        setQuery(initilize.query || "");
        return clearTimeout(timer);
      }, [initilize]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            onChange({
                query: debouncedSearchTerm,
                queryIsId: verifyQueryIsId(debouncedSearchTerm)
            });
        }
    }, [debouncedSearchTerm]);

    const verifyQueryIsId = (query) => {
        try {
          return !isNaN(Number(parseInt(query)));
        } catch (e) {
          return false;
        }
    };
    
    return (
        <div className="container-search">
            <div className="searchbar" onSubmit={(e)=>e.preventDefault()}>
                <input
                    className="input-search"
                    data-testid="search-searchbar-input"
                    onSubmit={(e) => e.preventDefault()}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    placeholder="Search for a comic title"
                    value={query}
                    autoComplete="off"
                    spellCheck={false}
                />
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <button className="button-search" onClick={() => {}}>
                            <FiSearch size={24} />
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default Search;