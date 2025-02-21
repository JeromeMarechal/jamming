import React from 'react'; 
import './searchBarSong.css';

function SearchBarSong() {
    return (
        <div className='search-bar'>
            <input type="text" />
            <button className='search-btn' type='submit'>SEARCH</button>
        </div>
    )
}

export default SearchBarSong; 