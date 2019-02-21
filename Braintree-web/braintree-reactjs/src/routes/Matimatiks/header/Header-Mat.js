import React, { Component } from 'react';
import './Header-Mat.css';
import andlogo from '../../braintree/downloads/mat-google-play-badge.png';
import matlogo from '../../braintree/downloads/mat_img_launch.png';
import braintreelogo from '../../braintree/homepage/Blogo.png';
import { NavLink } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase-config.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';



const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
 // signInSuccessUrl: '/Matimatiks/mode',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class Header_Mat extends Component {




  componentDidMount(){

    document.body.style.backgroundColor = "white";

    var size = window.innerWidth;
    var opt = document.getElementById("stf");

     if (/Edge/.test(navigator.userAgent) && size >= 1200)
        opt.style.marginLeft ="-10%";

     if (/Firefox/.test(navigator.userAgent) && size >= 1200)
        opt.style.marginLeft ="-10%";

  }

  render() {
    return (
  <div>{/* root div begin*/}
    <div  id="mat-bar" className="container-fluid">
       <nav id="mat-nav" className="navbar navbar-expand-lg">


        <div id="app-text" className="container">
        <img id="matlog" src={matlogo} className="mat_pics" alt="logo" />
      <div id="app" className="container">
       MATIMATIKS
      </div>
      </div>

       <div id="stf" className="container-fluid">

          <a  href="/">
              <img  src={braintreelogo} className="mdownb" alt="Braintree" />
          </a>

            <button id="si"  type="button" className="btn btn-outline-light" data-toggle="modal" data-target=".bd-example-modal-lg">Sign in</button>

             <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
            <div id="lgn-cont" className="container text-center">
           <p id="lgn">Login Below</p>
            <hr className="my-8"/>
           <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          <p id="pt">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer" >Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
        </div>
       </div>
     </div>
      </div>

            <NavLink id="link2" className="nav-link" to="">Contribute</NavLink>

            <NavLink id="link3" className="nav-link" to="">Community</NavLink>

            <NavLink id="link4" className="nav-link" to="">FAQ's</NavLink>

            <a id="link5"  href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks">
              <img  src={andlogo} className="mdown" alt="Get it on Google Play" />
          </a>

      </div>
     </nav>
      </div>
      </div>
    );
  }



}


export default Header_Mat;
