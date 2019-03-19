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
  <div id="brand" className="container">
    <img id="logo" src={logo} className="rounded"  alt=""/>
  </div>



  <ul className="list-inline">
    <li id="list1" className="list-inline-item"><a id="h1" href="/">Home</a></li>
    <li id="list2" className="list-inline-item"><a id="h2" href="/company">Company</a></li>
    <li id="list3" className="list-inline-item"><a id="h3" href="/downloads">Downloads</a></li>
  </ul>

  <div id="inp" className="input-group mb-3">
    <input type="text" className="form-control" placeholder="How can we help you?" aria-label="How can we help you" aria-describedby="button-addon2"/>
    <div className="input-group-append">
      <button className="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
    </div>
  </div>

  </div>
  </div>
    );
  }
}

export default Header;
