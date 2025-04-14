import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './header.css'
import {Link} from "react-router-dom";

function header() {
    return (

        <header className="header">
            <div className="logo-container">
                <h1 className="title">Crypto Dashboard</h1>
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorieten</Link>
            </nav>
        </header>
    );
}

export default header;
