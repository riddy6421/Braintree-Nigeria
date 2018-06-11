import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Homepage.css';
import firebase, { auth, provider } from '../firebase-config.js';
import naija from '../../Header/nigeria.png'
import Q1 from './Q1.JPG';
import Q2 from './Q2.jpg';
import A1 from './A1.jpg';
import A2 from './A2.jpg';
import $ from "jquery";



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


class Homepage extends Component {

   constructor() {
    super();
    this.state = {
      user: null,
      counter:0 
    }
    
  }


  componentWillMount(){


  /*Check if User is signed in*/
  auth.onAuthStateChanged((user) => {
    if (user) {
       this.setState({ user:user });
    
    /*check if their credentials are in the database*/
    var database = firebase.database();
    var userId = auth.currentUser.uid;

    var userNameRef = database.ref('/users/' + userId + '/Name');
    userNameRef.on('value', function(snapshot) {

      var value = snapshot.val();
      
      /* if they are, save them to the database(it's thier first time)*/
     if(value == null){
       
        database.ref('/users/' + userId).set({

           Name: this.state.user.displayName,

           Email: this.state.user.email

        });

      }

      else{

       //It's not thier first time
      }

});
         
 //window.location.href="/Matimatiks/mode";
    } else {
      //window.location.href="/Matimatiks";
    }
  });

  }


  componentDidMount(){
    
    var x =window.innerHeight;
    var y = document.getElementById("mat-title");
    var foot = document.getElementById("mat-foot");
    var z = x-88;
    y.style.height=z+"px";


  var Qimg1, Qimg2, Aimg1, Aimg2, BA1, str, topic, arr1, arr2;

   Qimg1 = document.getElementById('Qimg1'); 

   Qimg2 = document.getElementById('Qimg2'); 

   BA1 = document.getElementById('A1');

   topic = document.getElementById('q1');

   arr1 = document.getElementById('prev');

   arr2 = document.getElementById('next');

   let that = this;


   if(this.state.counter == 0)
      arr1.style.visibility = "hidden";



      arr2.addEventListener("click", function(){

        if(that.state.counter == 0){
            
            Qimg1.src = Q2

            arr1.style.visibility = "visible";

          }


    });


   

   BA1.addEventListener("click", function(){

   
    if(that.state.counter == 0){
     
      Qimg1.src = A1
      BA1.innerHTML = "Back to Question";
      topic.innerHTML = "Answer 1";
      that.setState({counter:1});

    }
       

    else{

      Qimg1.src = Q1
      BA1.innerHTML = "See Answer";
      topic.innerHTML = "Question 1";
      that.setState({counter:0});

    }

        
  });

}



  render() {
    return (
  <div>{/* root div begin*/}
    <div className="container-fluid">
      <Header/>
    </div>

    <div id="mat-title"className="container-fluid jumbotron text-center">
    MATIMATIKS
    </div>

   <div id="by" className="container text-center">
    <p>
    By Braintree Nigeria
    <img id="naij" src={naija} className="" alt="logo" />
    </p>


<button id="orig-but"  type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModalLong">
 See sample tutorial Q&A's
</button>


<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Sample Questions and Answers</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">

    
    <p id="q1">Question 1</p>

    <img id ="Qimg1" src={Q1} class="rounded mx-auto d-block" alt="sample question 1"/>

    <button id="prev" type="button" className="btn btn-outline-primary">&laquo;</button>


    <button id="A1" type="button" className="btn btn-outline-primary">See Answer</button>


    <button id="next" type="button" className="btn btn-outline-primary">&raquo;</button>

   



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

</div>

  <div id="start" className="container justify-content-center text-center">
    
<button id="start_button" type="button" class="btn btn-outline-light" data-toggle="modal" data-target=".bd-example-modal-lg">I am Ready to Start!</button>

    <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
    <div className="modal-content">
        <div className="container">
          <p id="lgn">Login Below</p>
          <hr className="my-4"/>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          <p id="pt">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer" >Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
        </div>
    </div>
  </div>
</div>

  </div>

  <div id="mat-foot" className="container-fluid">
      <Footer/>
  </div>

  </div>
    );
  }
}


export default Homepage;