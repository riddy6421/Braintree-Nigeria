import React, { Component } from 'react';
import './Home.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import pic from './apple.jpg';
import img from './Blogo.png';
import $ from 'jquery';
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }


  componentDidMount(){

    document.body.style.backgroundColor = "DarkSlateBlue";
    
  }

  start(){
    window.location.href="/getStarted";
  }

  render(){
    return ( 
        <div>
     
      <div id="head" className="container-fluid">
        <Header/>
      </div>


        <div className="jumbotron-fluid">

          <img id="bg" src={pic} className="img-fluid" alt="Responsive image"/>

         <div className="container-fluid text-center">
            <p> Serving and Preparing Millions Of Students</p>
            <p> For the utmost best</p>
            <p id="nj"> By Nigerians. For Everyone.</p>
        </div>

        <button id="btn" onClick={this.start} className="container-fluid btn justify-content-center" type="submit">Get Started</button>

      </div>


        <div id="foot" className="container-fluid">
          <Footer/>
        </div>


       </div>
  );
  }
}
export default Home;
