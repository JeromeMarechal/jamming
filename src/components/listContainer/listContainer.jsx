import React from 'react'; 
import { useState } from 'react'; 
import './listContainer.css'; 
import SearchResults from '../SearchResults/searchResults.jsx';
import Playlist from '../playlist/playlist.jsx';

function ListContainer({ songs, setSongs,  playlist, setPlaylist, playlistName, setPlaylistName, userId, accessToken, resultHeader, setResultHeader, userPlaylists, setUserPlaylists }) { 

    return (
        <div className='list-container'>
            <SearchResults 
            songs={songs} 
            playlist={playlist} 
            setPlaylist={setPlaylist} 
            resultHeader={resultHeader}
            userPlaylists={userPlaylists}
            accessToken={accessToken}
            />

            <Playlist 
            playlist={playlist} 
            setPlaylist={setPlaylist} 
            playlistName={playlistName} 
            setPlaylistName={setPlaylistName} 
            userId={userId} 
            accessToken={accessToken} 
            setResultHeader={setResultHeader}
            userPlaylists={userPlaylists}
            setUserPlaylists={setUserPlaylists}
            setSongs={setSongs}
            />
        </div>
    )
}

export default ListContainer; 