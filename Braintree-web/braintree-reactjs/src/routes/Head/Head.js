import React, { Component } from 'react';
import logo from './Blogo.png';
import './Head.css';
import matlogo from '../braintree/downloads/mat_img_launch.png';


class Head extends Component {

  componentDidMount(){document.getElementById("top").style.backgroundColor = "#364696"}

  render() {

    return (
  <div>{/* root div begin*/}
  <div id="top" className="container-fluid">

  {/*Brand begin*/}
  <div id="brand_br" className="container">
    <img id="logo_br" src={logo} className="rounded"  alt=""/>
  </div>



  <ul id="b-links" className="list-inline container">
    <li id="list1" className="list-inline-item"><a id="h1" href="/">Home</a></li>
    <li id="list2" className="list-inline-item"><a id="h2" href="/company">Company</a></li>
    <li id="list3" className="list-inline-item">
   <div id="drop" class="dropdown">
      <a className="dropdown-toggle" id="h3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Our Brands
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="/Matimatiks">
        <img id="drop-logo" src={matlogo} className="rounded"  alt=""/>
        Matimatiks
        </a>
  </div>
</div>
    </li>
    <li id="list4" className="list-inline-item"><a id="h4" href="/downloads">Downloads</a></li>
  </ul>

  <div id="inp" className="input-group mb-3 container">
    <input type="text" className="form-control" placeholder="How can we help you?" aria-label="How can we help you" aria-describedby="button-addon2"/>
    <div className="input-group-append">
      <button  className="btn btn-outline-secondary" type="button" id="button-addon2"><i id="icon" class="fas fa-search"></i></button>
    </div>
  </div>

  </div>

  </div>

    );
  }
}

export default Head;
