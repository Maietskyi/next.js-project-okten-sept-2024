import {FC, useEffect, useState} from "react";
import './SearchComponent.css'

interface SearchBarProps {
    searchType: "recipes" | "users";
    onSearch(value: string): void;
    search: string
}

export const SearchComponent: FC<SearchBarProps> = ({searchType, onSearch, search}) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };
    useEffect(() => {
        setQuery(search);
    }, [search]);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={`Search ${searchType === "recipes" ? "recipes" : "users"}...`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <button onClick={handleSearch}>🔎︎</button>
        </div>
    );
};