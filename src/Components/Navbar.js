import React, { Component } from 'react'; // React library.
import { Link } from 'react-router-dom'; // Routing component.
import '../App.css' // Styling Sheet.

// Navbar component that allows easy navigation on app:
class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Vehicle Database :</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">List Cars</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Car</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/edit/:id" className="nav-link">Edit Car</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;