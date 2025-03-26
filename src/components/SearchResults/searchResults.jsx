import React, { useEffect, useRef } from 'react';
import './searchResults.css';
import PlaylistButton from '../Buttons/playlistButon.jsx';

function SearchResults({ songs, playlist, setPlaylist, resultHeader, userPlaylists, accessToken }) {

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

    const editPlaylist = async (playlist_id) => {
        const response = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks', {
            method: 'GET', 
            headers: {
                Authorization:`Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);  
        }
    }

    return (
        <div className='search-results'>
            <div className='results-header'>
                <h2>{resultHeader}</h2>
            </div>
            <div className='results-list'>
                {songs.map((song) => (
                    <div className='track-list' key={song.id}>
                        <div className='info-track'>
                            <p><strong>Artist:</strong> {song.artist}</p>
                            <p><strong>Song:</strong> {song.name}</p>
                            <p><strong>Album:</strong> {song.album}</p>
                            <PlaylistButton onClick={() => addToPlaylist(song)} label='ADD' />
                        </div>
                    </div>
                ))}
                {userPlaylists.map((playlist) => (
                    <div className='playlist-list' key={playlist.id}>
                        <div className='playlist-info' >
                            <p>{playlist.name}</p>
                            <PlaylistButton onClick={()=> editPlaylist(playlist.id)} label='EDIT' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchResults;