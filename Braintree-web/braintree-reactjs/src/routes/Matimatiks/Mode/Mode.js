import React, { Component } from 'react';
import './Mode.css';
import Header from '../header/Header-Mat.js';
import Footer from '../../Footer/Footer'
import $ from 'jquery';
import firebase from '../firebase-config.js';


class Mode extends Component {


  constructor(){

    super();

    this.state = {
      name: null,
      status:-1
    }
  }

  componentWillMount(){

}
  componentDidMount(){

 let that = this

firebase.auth().onAuthStateChanged(function(user) {

if (user) {

var x = []

x = user.displayName.split(" ")

if(x[0] != null){
 that.setState({name:x[0]})
 that.setState({status:0})
}

else
  that.setState({name:"Anonymous"})

  if(that.state.name != null){
  var mSignin = document.getElementById("bt-li");

   mSignin.innerHTML = "Hi "+that.state.name

  $('#signin-cont').replaceWith('<div class="dropdown-menu"><a id="item1" class="dropdown-item" href="#">Progress Report</a><a id="item2" class="dropdown-item" href="#">Settings</a><a id="item3" class="dropdown-item" href="#">Help</a><div class="dropdown-divider"></div><button id="item4" type="button" class="btn">Log out</button></div>');

  var item1 = document.getElementById('item1');
  var item2 = document.getElementById('item2');
  var item3 = document.getElementById('item3');
  var item4 = document.getElementById('item4');

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
      console.log("signout unsuccessful")
 });

   window.location.reload()
})//signOut
}
  if(that.state.status == 0){
  document.getElementById('card1').addEventListener("click", function(){


  })//card 1 click

  document.getElementById('card2').addEventListener("click", function(){


  })//card 2 click

}

} else {

}
});

}

  render(){

  if(this.state.status == 0){
    return (
        <div>

        <div className="container-fluid">
          <Header/>
        </div>


        <div  id="mode-main" height="200" className="container-fluid">

        <div className="container d-flex justify-content-center">
           <h1 id="sl">Select Exam Mode</h1>
        </div>


        <div className="container-fluid d-flex justify-content-center">

        <div id="card1" class="card text-white bg-primary mb-3" >
          <div class="card-header">Mode A</div>
          <div class="card-body">
          <h5 class="card-title">Practice Exam Questions</h5>
          <p class="card-text">In this mode, the exam is untimed. Practice questions pertaning to different math topics are available.</p>
          <button id="card1-btn" type="button" class="btn btn-outline-dark">Launch</button>
         </div>
         </div>


        <div id="card2" class="card text-white bg-success mb-3">
          <div class="card-header">Mode B</div>
          <div class="card-body">
          <h5 class="card-title">Mock Exam</h5>
          <p class="card-text">In this mode, the exam is timed and results are computed strategically to determing your strength and/or weakneses</p>
          <button id="card2-btn" type="button" class="btn btn-outline-dark">Launch</button>
        </div>
      </div>
      </div>
</div>

      <div id="mode-ft" className="container-fluid">
        <Footer/>
      </div>

       </div>
	   );
   }


   else{
     return(<div></div>)
   }

	}
}


export default Mode;
