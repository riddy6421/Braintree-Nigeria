import React, { Component } from 'react';
import logo from './nigeria.png'; 
import './Header.css'   
import { NavLink } from 'react-router-dom';


class Header extends Component {

  render() {
    return (
  <div>{/* root div begin*/}
    <div className="container-fluid">
       <nav className="navbar navbar-expand-lg">

      <div className="container justify-content-start"> 
          <form className="form-inline my-2 my-lg-0">
           <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
           <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
      </div>


          <div id="head" className="container justify-content-center">Braintree Nigeria
            <img src={logo} className="pics" alt="logo" />
          </div>
          

       <div className="container justify-content-end">
          <ul className="navbar-nav active">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="/company">Company</NavLink>
          </li>
          <li  className="nav-item active">
            <NavLink className="nav-link" to="/downloads">Downloads</NavLink>
          </li>
          <li className="nav-item active">
            <NavLink  className="nav-link" to="/getStarted">Get Started</NavLink>
          </li>
        </ul>
      </div>
     </nav>
      </div>
      </div>
    );
  }
}

export default Header;

  