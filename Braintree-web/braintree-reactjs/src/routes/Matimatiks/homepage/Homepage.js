import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import Mode from '../Mode/Mode.js'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Homepage.css';
import firebase, { auth, provider, db} from '../firebase-config.js';
import naija from '../../Header/nigeria.png'
import matlogo from '../../braintree/downloads/mat_img_launch.png';

import Q1 from './Q1.JPG';
import Q2 from './Q2.jpg';
import A1 from './A1.jpg';
import A2 from './A2.jpg';


// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ]
};


class Homepage extends Component {

   constructor() {
    super();
    this.state = {
      user: null,
      counter:0,
      ques:0,
      shown:0,
      currentUser:0
    }

  }


  componentWillMount(){

 console.log("componentWillMount()")

}


  componentDidMount(){

    console.log("componentDidMount()")

   /*Check if user is signed in*/
    var context = this

    firebase.auth().onAuthStateChanged(function(user) {
       console.log("componentDidMount() firebase function")
        if (user) {


         context.setState({currentUser:1})

        } else {

            context.setState({currentUser:2})

        }

    });
    /*user sign-in check en*/

/*Set up homepage*/
if(this.state.currentUser == 2){
     var y = document.getElementById("mat-title");
    var size = window.innerWidth;

    if(size >= 1200 && size < 1900 ){
      y.style.height = window.screen.availHeight+"px";
    }


    var x =window.innerHeight;
    var j = document.getElementById("mat-title");
    var z = x-88
    j.style.height=z+"px";

    var foot1 = document.getElementById("heading1");
    var foot2 = document.getElementById("heading2");
    var foot3 = document.getElementById("heading3");

   foot1.style.color= "black";
    foot2.style.color= "black";
   foot3.style.color= "black";


  var Qimg1, BA1, topic, arr1, arr2;

   Qimg1 = document.getElementById('Qimg1');

   BA1 = document.getElementById('A1');

   topic = document.getElementById('q1');

   arr1 = document.getElementById('prev');

   arr2 = document.getElementById('next');

   let that = this;
// eslint-disable-next-line
  if(this.state.ques == 0)
      arr1.style.visibility = "hidden";

      arr2.addEventListener("click", function(){
// eslint-disable-next-line
        if(that.state.ques == 0){

            Qimg1.src = Q2;

            arr1.style.visibility = "visible";

            arr2.style.visibility = "hidden";

            topic.innerHTML="Question 2";

            that.setState({ques:1});

          }

    });


   arr1.addEventListener("click", function(){
// eslint-disable-next-line
        if(that.state.ques == 1){

            Qimg1.src = Q1;

            arr1.style.visibility = "hidden";

            arr2.style.visibility = "visible";

            topic.innerHTML="Question 1";

            that.setState({ques:0});

          }

    });



   BA1.addEventListener("click", function(){

   // eslint-disable-next-line
    if(that.state.counter == 0){

// eslint-disable-next-line
      if(that.state.ques == 0){

        Qimg1.src = A1
        BA1.innerHTML = "Back to Question";
        topic.innerHTML = "Answer 1";
        that.setState({counter:1});
        arr1.style.visibility = "hidden";
        arr2.style.visibility = "hidden";


      }

      else{

        Qimg1.src = A2
        BA1.innerHTML = "Back to Question";
        topic.innerHTML = "Answer 2";
        that.setState({counter:1});
        arr1.style.visibility = "hidden";
        arr2.style.visibility = "hidden";

      }

    }


    else{
// eslint-disable-next-line
      if(that.state.ques == 0){

        Qimg1.src = Q1
        BA1.innerHTML = "See Answer";
        topic.innerHTML = "Question 1";
        that.setState({counter:0});
        arr2.style.visibility = "visible";

      }

      else{

        Qimg1.src = Q2
        BA1.innerHTML = "See Answer";
        topic.innerHTML = "Question 2";
        that.setState({counter:0});
        arr1.style.visibility = "visible";

    }
  }


});

}
/*Set up homepage end*/
}
  render() {

// eslint-disable-next-line
  console.log("render()");

if(this.state.currentUser == 0){
       return(
         <div>

         <div  id="spin" className="mx-auto">
         <div id="blink" className="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
         </div>
         <div id="ltext">Loading...</div>
         </div>

        </div>

        );
}


 else if (this.state.currentUser == 1){

   return (<Mode/>)

 }
 else if (this.state.currentUser == 2){

   return (
 <div id="root">{/* root div begin */}
   <div className="container-fluid">
     <Header/>
   </div>

   <div id="main">
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

<button id="start_button" type="button" className="btn btn-outline-light" data-toggle="modal" data-target=".bd-example-modal-lg">I am Ready to Start!</button>

   <div id="mlogin" className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
   <div id="log" className="modal-dialog modal-lg">
   <div className="modal-content">
       <div className="container">
         <img id="login_logo" className="rounded" src={matlogo}/>
         <p id="lgn">Login Below</p>
         <hr className="my-4"/>
         <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
         <p id="pt">By logging in to Matimatiks, you agree to our <a href="" target="_blank" rel="noopener noreferrer" >Privacy Policy</a> and <a href="" target="_blank" rel="noopener noreferrer" >Terms of Service</a></p>
       </div>
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
}

export default Homepage;
