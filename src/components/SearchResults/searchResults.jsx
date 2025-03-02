import React from 'react'; 
import './searchResults.css';

function SearchResults({ songs }) {
    return (
        <div className='searchResults'>
            <h2>Results</h2>
            <ul className='results-list'>
                {songs.map((song, index) => (
                    <li key={index}>{song.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default SearchResults;