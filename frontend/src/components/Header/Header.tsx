import React from 'react'
import logo from './home.svg';
import './Header.css'

export default function Header(){
    return(
        <div className="header">
            <img src={logo} alt="logo" />
            <h1>Student Living</h1>
            
        </div>
        
    )
}