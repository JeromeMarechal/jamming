import React from 'react'; 
import { useState } from 'react'; 
import './listContainer.css'; 
import SearchResults from '../SearchResults/searchResults.jsx';
import Playlist from '../playlist/playlist.jsx';

function ListContainer({ songs, playlist, setPlaylist, playlistName, setPlaylistName, userId, accessToken }) { 

    return (
        <div className='list-container'>
            <SearchResults songs={songs} playlist={playlist} setPlaylist={setPlaylist} />
            <Playlist playlist={playlist} setPlaylist={setPlaylist} playlistName={playlistName} setPlaylistName={setPlaylistName} userId={userId} accessToken={accessToken} />
        </div>
    )
}

export default ListContainer; 