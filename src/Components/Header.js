import React from 'react'; // React library.
import '../App.css'; // Styling sheet.
import logo from '../Images/wheel.png'; // Import image.

// Header component:
function Header() {
    return (
        <header className="App-header">
            <h1>Fullstack App with MongoDB</h1>
            <img src={logo} className="App-logo" alt="logo" />
            <h2>This application allows you to engage with a database:</h2>
        </header>
    )
}

export default Header
