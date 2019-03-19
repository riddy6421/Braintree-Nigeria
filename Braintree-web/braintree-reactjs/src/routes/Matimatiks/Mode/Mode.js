import React, { Component } from 'react';
import './Mode.css';
import Header from '../header/Header-Mat.js';
import firebase from '../firebase-config.js';


class Mode extends Component {


  constructor(){

    super();

    this.state = {
      name: null
    }
  }

  componentWillMount(){
      let that = this

    firebase.auth().onAuthStateChanged(function(user) {

  if (user) {

    var x = []

    x = user.displayName.split(" ")

    if(x[0] != null)
      that.setState({name:x[0]})

    else
       that.setState({name:"Anonymous"})


       var mSignin = document.getElementById("si");

      //  mSignin.innerHTML = "Hi "+that.state.name

  } else {
    alert("sign in failed")
  }
});

  }

  componentDidMount(){

  //document.getElementById("si").disabled = true;

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
