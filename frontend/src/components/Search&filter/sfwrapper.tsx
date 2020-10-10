import React from 'react';
import './sf.css';


export default function Sfwrapper(){
    return(
        <div className="sfwrapper">
            <h1>Search:</h1>

            <h3>Sort by:</h3>
            <button type="button">Alfabetisk</button>
            <button type="button">Rating</button>
        </div>
        
    )
}