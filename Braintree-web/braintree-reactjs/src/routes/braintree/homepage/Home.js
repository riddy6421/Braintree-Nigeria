import React, { Component } from 'react';
import './Home.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import pic from './apple.jpg';
import img from './Blogo.png';
import {Link} from 'react-router-dom';

class Home extends Component {

    constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }


  componentDidMount(){

    var x =window.innerHeight;
    var y = document.getElementById("foot");
    var z = x-450;

    y.style.marginTop=z+"px";

  }

  start(){
    window.location.href="/getStarted";
  }

  render(){
    return ( 
        <div>
     
      <div className="container-fluid">
        <Header/>
      </div>


         <div id="logo">
            <img src={img} className="rounded mx-auto d-block" alt="logo"/>
         </div>

              <img src={pic} className="bg" alt="logo"/>
           
           <div className="container text-center">
            <h1>Serving and Preparing Millions of Students</h1>
            <h1>For The Utmost Best</h1>
           </div>

          

       <div id="mid"  className="container justify-content-center align-items-center">
        <button onClick={this.start} type="button" className="btn btn-primary btn-lg btn-block">
        Get Started
        </button>
       </div>


        <div id="foot" className="container-fluid">
          <Footer/>
        </div>


       </div>
  );
  }
}
export default Home;
