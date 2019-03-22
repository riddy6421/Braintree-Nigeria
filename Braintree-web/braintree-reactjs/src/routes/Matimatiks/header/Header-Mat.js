import React, { Component } from 'react';
import './Header-Mat.css';
import andlogo from '../../braintree/downloads/mat-google-play-badge.png';
import matlogo from '../../braintree/downloads/mat_img_launch.png';
import braintreelogo from '../../braintree/homepage/Blogo.png';
import { NavLink } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase-config.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import $ from 'jquery';
import Modal from 'react-bootstrap';



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

  }

  render() {
    var that = this;
    return (
  <div>{/* root div begin*/}

   <div id="mat-hd" className="container-fluid">

      <div id="mat-cont" className="container">
        <img id="mat-logo" className="rounded" src={matlogo}/>
        <p id="mat-brand"> MATIMATIKS </p>
      </div>

      <ul id="mat-op" className="list-inline">
         <li id="mat-li1"  className="list-inline-item">
         <div class="btn-group">
         <button id="bt-li" type="button" class="btn btn-outline-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sign In</button>
         <div id="signin-cont" class="dropdown-menu">
          <div id="signin-item" class="dropdown-item">
               <div className="container">
                 <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                 <p id="signin-rule">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer" >Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
               </div>
          </div>
        </div>
         </div>
         </li>
        <a href="#"><li id="mat-li2" className="list-inline-item">Donate</li></a>
        <a href="#"><li id="mat-li3" className="list-inline-item">Community</li></a>
        <li id="mat-li4" className="list-inline-item">
          <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
            Downloads
          </button>
        </li>
      </ul>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5  class="modal-title" id="exampleModalLabel">Downloads</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

      <a href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks" target="_blank"><img id="andlogo" className="rounded" src={andlogo}/></a>

      </div>
    </div>
  </div>
</div>

   </div>
  </div>
    );
  }



}


export default Header_Mat;
