import React, { Component } from 'react';
import './Downloads.css';
import andlogo from './google-play-badge.png'
import matlogo from './img_launch.png'
import Header from '../../Header/Header.js';
import Footer from '../../Footer/Footer.js';



class Downloads extends Component {

componentDidMount(){

    var x =window.innerHeight;
    var y = document.getElementById("ft");
    var z = x-500;

    y.style.marginTop=z+"px";

  }

  render(){
    return ( 
        <div>

        <div className="container-fluid">
           <Header/>
        </div>

      <div id="app1" className="jumbotron">
            <h1 className="display-8">Matimatiks</h1>
            <img src={matlogo} className="mlogo" alt="logo"/>
            <p className="lead">A personalized Mathematics tutorial app for <a href="https://www.waecdirect.org/" target="_blank" rel="noopener noreferrer" >W.A.E.C</a> <a href="http://www.mynecoexams.com/" target="_blank" rel="noopener noreferrer" >N.E.C.O</a>
                &nbsp; and  <a href="https://www.jamb.org.ng/" target="_blank" rel="noopener noreferrer">U.T.M.E</a> Examinations.
            </p>
              
            <hr className="my-4"/>
            <a  href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks">
              <img id="android"  src={andlogo} className="rounded mx-auto d-block" alt="Get it on Google Play" />
          </a>
      </div>


     <div id="ft" className="container-fluid">
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Downloads;