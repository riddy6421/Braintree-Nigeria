import React, { Component } from 'react';
import './Header-Mat.css';
import andlogo from '../../braintree/downloads/mat-google-play-badge.png';
import matlogo from '../../braintree/downloads/mat_img_launch.png';
import braintreelogo from '../../braintree/homepage/Blogo.png';
import { NavLink } from 'react-router-dom';
import firebase, { auth, provider } from '../firebase-config.js';
import Mode from '../Mode/Mode.js'
import logo from '../../Head/Blogo.png';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import $ from 'jquery';


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



  constructor() {
   super();
   this.state = {
     name: null,
     LoggedIn:false
   }

 }

  componentWillMount(){
   this.setState({LoggedIn:this.props.login})
  }

  componentDidMount(){
  //  document.body.style.backgroundColor = "white";
  if(this.state.LoggedIn)
     this.setState({name:this.props.name})
  }

  componentDidUpdate(){
      var that = this;
 if(that.state.name){
    var firstname = []

    firstname = that.state.name.split(" ")//get firstname

    var username = firstname[0]

    if(username != null){
       var mSignin = document.getElementById("bt-li");

       mSignin.innerHTML = "Hi,"+username

    /*replace the sign in dropdown with account properties */
    $('#signin-cont').replaceWith('<div class="dropdown-menu"><a id="item1" class="dropdown-item" href="#">Progress Report</a><a id="item2" class="dropdown-item" href="#">Settings</a><a id="item3" class="dropdown-item" href="#">Help</a><div class="dropdown-divider"></div><button id="item4" type="button" class="btn">Log out</button></div>');

    var item1 = document.getElementById('item1');
    var item2 = document.getElementById('item2');
    var item3 = document.getElementById('item3');
    var item4 = document.getElementById('item4');

    /*set listeners to the properties buttons*/
    item1.addEventListener("mouseover", function () {

       item1.style.color = "#40bcff"

    })
    item1.addEventListener("mouseout", function () {

     item1.style.color = "black"

    })

    item2.addEventListener("mouseover", function () {

       item2.style.color = "#40bcff"

    })
    item2.addEventListener("mouseout", function () {

     item2.style.color = "black"

    })

    item3.addEventListener("mouseover", function () {

       item3.style.color = "#40bcff"

    })
    item3.addEventListener("mouseout", function () {

     item3.style.color = "black"

    })

    item4.addEventListener("mouseover", function () {

       item4.style.color = "#40bcff"

    })
    item4.addEventListener("mouseout", function () {

     item4.style.color = "black"

    })

    item4.addEventListener("click", function () {
      firebase.auth().signOut().then(function() {
        console.log("signout successful")
      }).catch(function(error) {
        console.log("signout unsuccessful: "+error)
   });


       window.location.reload()
       alert("You are logging out. Continue?")
  })//signOut

  }
}
}

  render() {

    return (

  <div>{/* root div begin*/}

   <div id="mat-hd" className="container-fluid">

      <div id="mat-cont" className="container">
        <img id="mat-logo" className="rounded" src={matlogo}/>
        <p id="mat-brand"> MATIMATIKS </p>
      </div>


      <div class="d-flex justify-content-end">

          <div id="brand" className="container">
            <a href="/"> <img id="logo" src={logo} className="rounded"  alt=""/></a>
          </div>


             <div id="bt-li"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</div>
             <div id="signin-cont" class="dropdown-menu">
               <div id="signin-item" class="dropdown-item">
                   <div className="container">
                     <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                     <p id="signin-rule">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer" >Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
                   </div>
              </div>
            </div>


            <a id="bt-li2" href="#">Community</a>

            <a id="bt-li3"  data-toggle="modal" data-target="#exampleModal">Downloads</a>


      </div>

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
    <hr id="hr" className="my-0"/>
  </div>
    );
  }

}

export default Header_Mat;
