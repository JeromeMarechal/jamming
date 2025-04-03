import React from "react";
import { useState } from "react";
import './playlist.css';
import PlaylistButton from "../Buttons/playlistButon.jsx";

function Playlist({ playlist, setPlaylist, playlistName, setPlaylistName, userId, accessToken, setResultHeader, setUserPlaylists, setSongs, playlistId, setPlaylistId }) {

    const [importedPlaylist, setImportedPlaylist] = useState([]);

    const handleChange = async (e) => {
        const newPlaylistName = e.target.value; 
        setPlaylistName(newPlaylistName);

        if (playlistId) {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    "name": newPlaylistName,
                    "description": "Updated playlist description via Jammming App",
                    "public": false
                })
            })

            if (response.ok) {
                console.log("Playlist's details updated successfully");
            } else {
                const errorData = await response.json();
                console.error("Failed to update playlist's details ", response.status, response.statusText, errorData);
            }
        }
    }

    const removeFromPlaylist = async (index, playlist_id, uri) => {
        setPlaylist(playlist.filter((_, i) => i !== index));

        if (playlist_id) {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    tracks: [{uri: uri}]
                })
            })

            if (!response.ok) {
                const errorData = await response.json(); 
                console.log('Failed to remove song from playlist:', response.status, response.statusText, errorData); 
                alert('Failed to remove song from playlist, please try again.'); 
            }
        }
    }

    const addPlaylistContent = async (playlist_id) => {

        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                uris: playlist.map(song => song.uri),
                position: 0
            })
        })

        if (response.ok) {
            const data = await response.json();
            console.log("Playlist content added", data);
        } else {
            const errorData = await response.json();
            console.error("Failed to add playlist content", response.status, response.statusText, errorData);
        }
    }

    const createPlaylist = async () => {
        if (playlistId) {
            const confirmation = window.confirm("This playlist already exist, if you want to save changes, please use the 'save' button otherwise confirm to continue and create a new playlist from that one. ");
            if (!confirmation) {
                return;
            }
        }

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
        })

        if (response.ok) {
            const data = await response.json();
            console.log('Playlist Created:', data);
            await addPlaylistContent(data.id);
            setPlaylistId(data.id);
            setPlaylistName(playlistName); 
        } else {
            const errorData = await response.json();
            console.error('Failed to create playlist:', response.status, response.statusText, errorData);
            alert('Failed to create playlist, please try again.');
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
            setUserPlaylists(data.items.map(item => ({
                id: item.id,
                name: item.name
            })));
            setResultHeader('Playlists');
        } else {
            const errorData = await response.json();
            console.error('Failed to import playlists:', response.status, response.statusText, errorData);
            alert('failed to import playlists, please try again.');
        }
    }

    const clearPlaylist = () => {
        const confirmation = window.confirm("Warning!! This action will clear the playlist window, confirm to proceed.");
        if (!confirmation) {
            return;
        } else {
            setPlaylistId('');
            setPlaylistName('');
            setPlaylist([]);
        }
    }

    return (
        <div className="playlist">
            <div className="header-playlist">
                <PlaylistButton label='IMPORT' onClick={importPlaylist} />
                <input type="text" placeholder="Playlist's name" onChange={handleChange} value={playlistName || ''} required />
                <PlaylistButton label='CREATE' onClick={createPlaylist} />
                <PlaylistButton label='CLEAR' onClick={clearPlaylist} />
            </div>
            <div className="songs">
                {playlist.map((song, index) => (
                    <div className='track-list' key={index}>
                        <div className='info-track'>
                            <p><strong>Artist:</strong> {song.artist}</p>
                            <p><strong>Song:</strong> {song.name}</p>
                            <p><strong>Album:</strong> {song.album}</p>
                            <PlaylistButton onClick={() => removeFromPlaylist(index, playlistId, song.uri)} label='REMOVE' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlist;