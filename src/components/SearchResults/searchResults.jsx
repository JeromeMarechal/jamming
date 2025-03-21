import React, { useEffect, useRef } from 'react';
import './searchResults.css';
import PlaylistButton from '../Buttons/playlistButon.jsx';

function SearchResults({ songs, playlist, setPlaylist }) {

    const addToPlaylist = (song) => {
        const isInPlaylist = playlist.some(playlistSong => playlistSong.name === song.name && playlistSong.artist === song.artist);

        if (isInPlaylist) {
            const confirmation = window.confirm("This song is already part of that playlist, would you like to add it one more time?");
            if (!confirmation) {
                return;
            }
        }

        setPlaylist(prevPlaylist => [...prevPlaylist, song]);
    };

    return (
        <div className='search-results'>
            <div className='results-header'>
                <h2>Results</h2>
            </div>
            <div className='results-list'>
                {songs.map((song, index) => (
                    <div className='track-list' key={index}>
                        <div className='info-track'>
                            <p><strong>Artist:</strong> {song.artist}</p>
                            <p><strong>Song:</strong> {song.name}</p>
                            <p><strong>Album:</strong> {song.album}</p>
                            <PlaylistButton onClick={() => addToPlaylist(song)} label='ADD' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;