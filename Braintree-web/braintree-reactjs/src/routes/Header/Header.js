import React, { Component } from 'react';
import logo from './Blogo.png'; 
import './Header.css'   

import { NavLink } from 'react-router-dom';


class Header extends Component {

  render() {
    return (
  <div>{/* root div begin*/}
       <nav className=" container-fluid navbar navbar-expand-lg">
          
          <form className="container form-inline my-2 my-lg-0  justify-content-start">
           <input id="search-bar" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
           <button id="search-btn" className="btn my-2 my-sm-0" type="submit">Search</button>
          </form>
      
   
          <div id="head" className="container justify-content-center">Braintree Nigeria
            <img src={logo} className="pics" alt="logo" />
          </div>
                      
            <NavLink id="links" className="nav-link" to="/">Home</NavLink>
            <NavLink id="links" className="nav-link" to="/company">Company</NavLink>
            <NavLink id="links" className="nav-link" to="/downloads">Downloads</NavLink>
          
     </nav>
  </div>
    );
  }
}

export default Header;

  