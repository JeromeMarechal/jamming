import React from 'react'; 
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa'; 
import './PlayBar.css'

function PlayBar() {
    return (
        <div className='play-bar'>
            <div className='track-info'>
                <h4>Track Title</h4>
                <p>Artist Name</p>
            </div>
            <div className='controls'>
                <FaStepBackward className='icon' />
                <FaPlay className='icon' />
                <FaStepForward className='icon' />
            </div>
            <div className='progress-bar'>
                <input type="range" min='0' max='100' />
            </div>
        </div>
    )
}

export default PlayBar; 