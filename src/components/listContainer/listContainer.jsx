import React from 'react'; 
import './listContainer.css'; 
import SearchResults from '../SearchResults/searchResults.jsx';
import Playlist from '../playlist/playlist.jsx';

function ListContainer({ songs }) {
    return (
        <div className='list-container'>
            <SearchResults songs={songs} />
            <Playlist />
        </div>
    )
}

export default ListContainer; 