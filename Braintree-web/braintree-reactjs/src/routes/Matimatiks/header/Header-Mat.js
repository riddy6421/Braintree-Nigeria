import React, { Component } from 'react';
import './Header-Mat.css';
import andlogo from '../../braintree/downloads/mat-google-play-badge.png';
import matlogo from '../../braintree/downloads/mat_img_launch.png';
import { NavLink } from 'react-router-dom';

class Header_Mat extends Component {

  render() {
    return (
  <div>{/* root div begin*/}
    <div  id="mat-bar" className="container-fluid">
       <nav id="mat-nav" className="navbar navbar-expand-lg">

      <div id="app" className="container justify-content-start">
        <img id="matlog" src={matlogo} className="mat_pics" alt="logo" /> 
         MATIMATIKS
      </div>
          

       <div className="container justify-content-center">
          <ul  className="navbar-nav active">
          <li  className="nav-item">
            <button id="ls" type="button" class="btn btn-outline-primary">Login/Signup</button>
          </li>
          <li className="nav-item">
            <NavLink id="link2" className="nav-link" to="">Contribute</NavLink>
          </li>
          <li className="nav-item">
            <NavLink id="link3" className="nav-link" to="">Community</NavLink>
          </li>
          <li className="nav-item">
            <NavLink id="link4" className="nav-link" to="">FAQ's</NavLink>
          </li>
          <li  className="nav-item active">
            <a id="link5"  href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks">
              <img  src={andlogo} className="mdown" alt="Get it on Google Play" />
          </a>
          </li>
        </ul>
      </div>
     </nav>
      </div>
      </div>
    );
  }



}


export default Header_Mat;