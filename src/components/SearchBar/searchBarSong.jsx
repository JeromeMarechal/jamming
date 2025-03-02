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
            artist: item.artists[0].name
        })));
        console.log(songs); 
    }

    const fetchsongs = async (query) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const results = await response.json();
            console.log('API Response:', results); // Log the API response after it is defined
            return results;
        } catch (error) {
            console.error('Error fetching songs:', error);
            return { tracks: { items: [] } }; // Return an empty result on error
        }
    }

    return (
        <div className='search-bar'>
            <input type="text" placeholder='Search for a song, artist ..... ' onChange={handleChange} value={query} />
            <button className='search-btn' type='submit' onClick={submitSearch}>SEARCH</button>
        </div>
    )
}

export default SearchBarSong;