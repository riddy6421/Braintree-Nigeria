import React, { Component } from 'react';
import './Footer.css';
import fb from '../facebook.png';
import tw from '../twitter.png';
import ins from '../instagram.png';

class Footer extends Component {

  componentDidMount(){

  }

  render() {
    return (
  <div>{/* root div begin*/}
       <div id="info2" className="container-fluid">
       <div id="row1" className="row">
         <div id="heading1" className="col">Copyright © 2018 Braintree Nigeria.</div>
         <div id="heading2" className="col">Legal</div>
         <div id="heading3" className="col">Contact us</div>
     </div>
     <div id="row2" className="row">
         <div id="heading4" className="col"></div>
         <div id="heading5" className="col">
            <ul id="legal-list" className="nav flex-column">
              <li className="nav-item">
              <a className="nav-link" href="">Privacy Policy</a>
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



  </div>
    );
  }
}

export default Footer;
