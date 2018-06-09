import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Homepage.css';

class Homepage extends Component {

  componentDidMount(){

    var x =window.innerHeight;
    var y = document.getElementById("mat-title");
    var z = x-84;
    y.style.height=z+"px";

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
    <p>By Braintree Nigeria</p>
    <button type="button" class="btn btn-outline-primary">See sample tutorials</button>
   </div>

  <div id="start" className="container justify-content-center text-center">
    <button id="start_button" type="button" class="btn btn-outline-light">I am Ready to Start! </button>
  </div>

  <div id="mat-foot" className="container-fluid">
      <Footer/>
  </div>

  </div>
    );
  }
}


export default Homepage;