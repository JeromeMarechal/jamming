import React from "react";
import { useState } from "react";
import './playlist.css';
import PlaylistButton from "../Buttons/playlistButon.jsx";

function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName, userId, accessToken, setResultHeader, userPlaylists, setUserPlaylists, setSongs }) {

    const [importedPlaylist, setImportedPlaylist] = useState([]); 

    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    }

    const removeFromPlaylist = (index) => {
        setPlaylist(playlist.filter((_, i) => i !== index));
    }

    const createPlaylist = async () => {
        const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: playlistName, 
                description: 'new playlist from Jammming App', 
                public: false
            })
        }); 

        if (response.ok) {
            const data = await response.json(); 
            console.log('Playlist Created:', data); 
        } else {
            const errorData = await response.json(); 
            console.error('Failed to create playlist:', response.status, response.statusText, errorData); 
        }
    }

    const importPlaylist = async () => {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'GET', 
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.ok) {
            const data = await response.json(); 
            console.log('Playlist Imported:', data); 
            setSongs([]); 
            setUserPlaylists(data.items.map(item =>({
                id: item.id,
                name: item.name
            }))); 
            setResultHeader('Playlists');
        } else {
            const errorData = await response.json(); 
            console.error('Failed to import playlists:', response.status, response.statusText, errorData); 
            setResultHeader('failed to moad playlists!!');
        }
    }

    return (
        <div className="playlist">
            <div className="header-playlist">
                <PlaylistButton label='IMPORT' onClick={importPlaylist} />
                <input type="text" placeholder="Playlist's name" onChange={handleChange} value={playlistName} required />
                <PlaylistButton label='CREATE' onClick={createPlaylist} />
            </div>
            <div className="songs">
                {playlist.map((song, index) => (
                    <div className='track-list' key={index}>
                        <div className='info-track'>
                            <p><strong>Artist:</strong> {song.artist}</p>
                            <p><strong>Song:</strong> {song.name}</p>
                            <p><strong>Album:</strong> {song.album}</p>
                            <PlaylistButton onClick={() => removeFromPlaylist(index)} label='REMOVE' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlist;