import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">Create</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/edit">Edit</Link>
          </li> */}
          <li className="nav-item">
            <Link className="nav-link" to="/product">Product</Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/create">Create</Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
