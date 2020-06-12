import React from 'react';

const SearchBar = () => {
    return (
        <input
            className="searchTerm"
            type="text"
            placeholder="Search settings"
            onChange={e => {
                console.log(e);
            }}
        />
    );
};
