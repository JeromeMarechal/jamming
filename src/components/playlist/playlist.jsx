import React from "react";
import './playlist.css'; 

function Playlist() {
    return (
        <div className="playlist">
            <h2>Playlist</h2>
            <input type="text" placeholder="Playlist's name" required />
            <ul className="songs">
                <li></li>
            </ul>
        </div>
    )
}

export default Playlist; 