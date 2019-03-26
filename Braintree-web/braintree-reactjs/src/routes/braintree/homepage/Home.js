import React, { Component } from 'react';
import './Home.css';
import Head from '../../Head/Head';
import Footer from '../../Footer/Footer';
import pic from './wallpaper.png';
import img from './Blogo.png';


class Home extends Component {

    constructor(props) {
    super(props);

  }


  componentDidMount(){
   document.getElementById("main-btn").addEventListener("click",function () {
     window.location.href="/getStarted"
   })

  }


  render(){

    return (
        <div>

        <div>
          <Head/>
        </div>


      <div id="mn">

          <img id="mlogo" src={pic}  alt="logo"/>

       <div id="main-div" class="d-flex justify-content-center">
          <p id="main-text" className="shadow-sm">Braintree Nigeria</p>
       </div>

       <div id="main-div2" class="d-flex justify-content-center">
          <p id="main-text2">Serving and Preparing Millions Of Students</p>
       </div>

       <div id="main-div3" class="d-flex justify-content-center">
          <p id="main-text3">For the utmost best</p>
       </div>

       <div id="main-div4" class="d-flex justify-content-center">
          <p id="main-text4">By Nigerians. For Everyone.</p>
       </div>

       <div id="main-div5" class="d-flex justify-content-center">
          <button id="main-btn" type="button" class="btn btn-light btn-lg">Getting Started</button>
       </div>


      </div>

      <div>
        <Footer/>
      </div>


       </div>
  );
  }
}
export default Home;
