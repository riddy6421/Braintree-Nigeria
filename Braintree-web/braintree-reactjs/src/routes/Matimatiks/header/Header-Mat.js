import React, { Component } from 'react';
import './Header-Mat.css';
import andlogo from '../../braintree/downloads/mat-google-play-badge.png';
import matlogo from '../../braintree/downloads/mat_img_launch.png';
import { auth, onAuth, db } from '../firebase-config.js';
import '../firebaseui-styling.global.css';
import logo from '../../Head/Blogo.png';
import Modal from 'react-bootstrap/Modal'
import Progress from '../Progress/Progress.js'
import {StyledFirebaseAuth} from 'react-firebaseui';
import $ from 'jquery';


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
 // signInSuccessUrl: '/Matimatiks/mode',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    auth.EmailAuthProvider.PROVIDER_ID,
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.FacebookAuthProvider.PROVIDER_ID,
    auth.TwitterAuthProvider.PROVIDER_ID
  ]
};

class Header_Mat extends Component {



  constructor() {
   super();
   this.state = {
     name: null,
     LoggedIn:false,
     progress:false,
     mode:null
   }

   this.checkIfUserRegistered = this.checkIfUserRegistered.bind(this);
   this.setUserProfile = this.setUserProfile.bind(this);
 }

  componentWillMount(){
   this.setState({LoggedIn:this.props.login})
   this.setState({progress:false})
   this.setState({mode:this.props.mode})
  }

  componentDidMount(){

    var modal = document.getElementById('download-modal');

  if(this.state.LoggedIn){
      this.setState({name:this.props.name})
      this.setUserProfile()
      this.checkIfUserRegistered();
   }

   document.getElementById('bt-li3').addEventListener("click", function () {

        modal.style.display = "block"

   })

   window.onclick = function(event) {
     // eslint-disable-next-line
     if (event.target == modal) {

           modal.style.display = "none"
     }
   }


  }


  setUserProfile(){
    var that = this;

if(this.props.name){
  var firstname = []

  firstname = that.props.name.split(" ")//get firstname

  var username = firstname[0]

  if(username != null){
     var mSignin = document.getElementById("bt-li");

     mSignin.innerHTML = "Hi, "+username

  /*replace the sign in dropdown with account properties */
  $('#signin-cont').replaceWith('<div id="d-menu" class="dropdown-menu"><a id="item1" class="dropdown-item" href="/Matimatiks/report">Progress Report</a><a id="item2" class="dropdown-item" href="#">Settings</a><a id="item3" class="dropdown-item" href="#">Help</a><div class="dropdown-divider"></div><button id="item4" type="button" class="btn">Log out</button></div>');

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
    if(!that.props.shown){
    var confirm = window.confirm("You are logging out. Continue?")
// eslint-disable-next-line
    if(confirm == true){
      onAuth.signOut().then(function() {
        console.log("signout successful")
         window.sessionStorage.setItem('user',null)
      }).catch(function(error) {
        console.log("signout unsuccessful: "+error)
   });
    window.location.reload()
  }

}
else {
  onAuth.signOut().then(function() {
    console.log("signout successful")
  }).catch(function(error) {
    console.log("signout unsuccessful: "+error)
});
window.location.reload()
}

})//signOut

}
}

}

//   componentDidUpdate(){
//
// }

checkIfUserRegistered(){
   var that = this

var user = onAuth.currentUser

 db.collection("users").doc(user.uid)

    .onSnapshot(function(doc) {


      if(doc.data() == undefined){

        db.collection("users").doc(user.uid).set({

             Name: user.displayName,
             Email: user.email

        }).then(function() {


        }).catch(function(error){

      });

      }


//  if(first == true){
//       document.getElementById('signInAlert').style.display = "block"
//       setTimeout(function(){
//         document.getElementById('signInAlert').style.display = "none"
//       },2000);
//
// }


});

}

  render() {
      return (
    <div>{/* root div begin*/}

    <div id="signInAlert" className="alert alert-success" role="alert">
            You are signed in!
    </div>

     <div id="mat-hd" className="container-fluid">

        <div id="mat-cont" className="container">
          <img id="mat-logo" className="rounded" src={matlogo} alt=""/>
          <p id="mat-brand"> MATIMATIKS </p>
        </div>


        <div className="d-flex justify-content-end">

            <div id="brand" className="container">
              <a href="/"> <img id="logo" src={logo} className="rounded"  alt=""/></a>
            </div>

               <div id="bt-li"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Log In</div>
               <div id="signin-cont" className="dropdown-menu">
                 <div id="signin-item" className="dropdown-item">
                     <div className="container">
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={onAuth}/>
                        <p id="signin-rule">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
                    </div>
                </div>
              </div>

              <a id="bt-li2" href="#">Community</a>

              <a id="bt-li3"  data-toggle="modal" data-target="#exampleModal">Downloads</a>
        </div>


        <div id="download-modal">
         <Modal.Dialog>
           <Modal.Header id="download-hd">
             <Modal.Title>Matimatiks</Modal.Title>
           </Modal.Header>
           <Modal.Body id="download-body">
            <a href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks" rel="noopener noreferrer" target="_blank"><img id="andlogo" className="rounded" src={andlogo} alt=""/></a>
           </Modal.Body>
         </Modal.Dialog>;
      </div>

     </div>
      <hr id="hr" className="my-0"/>
    </div>
      );


  }

}

export default Header_Mat;
