import React, { Component } from 'react';
import logo from './Blogo.png';
import './Header.css';
import { NavLink } from 'react-router-dom';


class Header extends Component {

  render() {
    return (
  <div>{/* root div begin*/}
  <div id="head" className="container-fluid">

  {/*Brand begin*/}
  <div id="brand" class="container">
    <img id="logo" src={logo} className="rounded"  alt=""/>
  </div>



  <ul class="list-inline">
    <li class="list-inline-item"><a href="/">Home</a></li>
    <li class="list-inline-item"><a href="/company">Company</a></li>
    <li class="list-inline-item"><a href="/downloads">Downloads</a></li>
  </ul>

  <div id="inp" class="input-group mb-3">
    <input type="text" class="form-control" placeholder="How can we help you?" aria-label="How can we help you" aria-describedby="button-addon2"/>
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
    </div>
  </div>

  </div>
  </div>
    );
  }
}

export default Header;
