import React from 'react';
import { useState, useEffect } from 'react'; 
import './searchBarSong.css';

function SearchBarSong({ songs, setSongs, accessToken }) { 
    const [query, setQuery] = useState(''); 

    const handleChange = (e) => {
        setQuery(e.target.value); 
    }

    const submitSearch = async (e) => {
        e.preventDefault(); 
        const searchResults = await fetchsongs(query);
        setSongs(searchResults.tracks.items.map(item => ({
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name
        })));
        console.log(songs); 
        setQuery(''); 
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            submitSearch(e); 
        }
    }

    const fetchsongs = async (query) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album%2Ctrack%2Cartist`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const results = await response.json();
            console.log('API Response:', results);
            return results;
        } catch (error) {
            console.error('Error fetching songs:', error);
            return { tracks: { items: [] } };
        }
    }

    return (
        <div className='search-bar'>
            <input 
            type="text" 
            placeholder='Search for a song, artist ..... ' 
            onChange={handleChange} 
            onKeyPress={handleKeyPress} 
            value={query} 
            />
            <button className='search-btn' type='submit' onClick={submitSearch}>SEARCH</button>
        </div>
    )
}

export default SearchBarSong;