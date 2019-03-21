import React, { Component } from 'react';
import './Mode.css';
import Header from '../header/Header-Mat.js';
import $ from 'jquery';
import firebase from '../firebase-config.js';


class Mode extends Component {


  constructor(){

    super();

    this.state = {
      name: null
    }
  }

  componentWillMount(){

}
  componentDidMount(){

 //document.getElementById("bt-li").disabled = true;
 let that = this

firebase.auth().onAuthStateChanged(function(user) {

if (user) {

var x = []

x = user.displayName.split(" ")

if(x[0] != null)
 that.setState({name:x[0]})

else
  that.setState({name:"Anonymous"})


  var mSignin = document.getElementById("bt-li");

   mSignin.innerHTML = "Hi "+that.state.name

  $('#signin-cont').replaceWith('<div class="dropdown-menu"><a class="dropdown-item" href="#">Progress Report</a><a class="dropdown-item" href="#">Settings</a><a class="dropdown-item" href="#">Help</a><div class="dropdown-divider"></div><button type="button" class="btn">Log out</button></div>');



} else {
alert("sign in failed")
}
});

// <a class="dropdown-item" href="#">Action</a>
// <a class="dropdown-item" href="#">Another action</a>
// <a class="dropdown-item" href="#">Something else here</a>
// <div class="dropdown-divider"></div>
// <button type="button" class="btn">Log out</button>


  }

  render(){


    return (
        <div>
        <Header/>


       </div>
	   );
	}
}


export default Mode;
