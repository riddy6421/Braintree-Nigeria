import React, { Component } from 'react';
import './Footer.css';
import fb from '../facebook.png';
import tw from '../twitter.png';
import ins from '../instagram.png';
import {Link} from 'react-router-dom';

class Footer extends Component {



  ComponentDidMount(){

    
  }

  render() {
    return (
  <div>{/* root div begin*/}     
       <div id="info2" className="jumbotron-fluid">
       <div id="row1" className="row">
         <div id="heading1" className="col"> Copyright © 2018 Braintree Nigeria.</div>
         <div id="heading2" className="col"> Legal</div>
         <div id="heading3" className="col"> Contact us</div>
     </div>
     <div id="row2" className="row">
         <div id="heading4" className="col"></div>
         <div id="heading5" className="col">
            <ul className="nav flex-column">
              <li className="nav-item">
              <a className="nav-link active" href="">Privacy Policy</a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="">Terms Of Service</a>
              </li>
             </ul>
        </div>
         <div id="heading6" className="col">

          <a href=""><img src={fb} className="pi" alt="logo" /></a>
          <a href=""><img src={tw} className="pi2" alt="logo" /></a>
          <a href=""><img src={ins} className="pi3" alt="logo" /></a>

         </div>
     </div>

     <div id="row3" className="row">
         <div id="heading7" className="col">


         </div>
         <div id="heading8" className="col">
        </div>
         <div id="heading9" className="col">
         </div>
     </div>

    </div>







<div id="info1" className="jumbotron-fluid">

  <ul id="list" className="list-inline">
    <li className="list-inline-item"><Link to="">Privacy Policy</Link></li>
    <li className="list-inline-item"><Link to="">Terms of Service</Link></li>
</ul>

<p id="ptr" className="container-fluid justify-content-center">
  <a href=""><img src={fb} className="pi" alt="logo" /></a>
  <a id="pi" href=""><img src={tw} className="pi2" alt="logo" /></a>
  <a id="pi2"  href=""><img src={ins} className="pi3" alt="logo" /></a>
</p>

<p id="doc" className="container-fluid justify-content-center"> Copyright © 2018 Braintree Nigeria.</p>
       
</div> 



  </div>
    );
  }
}

export default Footer;
