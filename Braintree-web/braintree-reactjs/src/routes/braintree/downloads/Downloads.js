import React, { Component } from 'react';
import './Downloads.css';
import andlogo from './mat-google-play-badge.png'
import matlogo from './mat_img_launch.png'
import Head from '../../Head/Head';
import Footer from '../../Footer/Footer.js';



class Downloads extends Component {

componentDidMount(){

}

  render(){
    return (
        <div>

        <div>
           <Head />
        </div>

      <div id="app1" className="jumbotron">
            <h1 id="mat" className="display-8">Matimatiks</h1>
            <img src={matlogo} className="mlogo" alt="logo"/>
            <p className="lead">A personalized Mathematics tutorial app for <a href="https://www.waecdirect.org/" target="_blank" rel="noopener noreferrer" >W.A.E.C</a> <a href="http://www.mynecoexams.com/" target="_blank" rel="noopener noreferrer" >N.E.C.O</a>
                &nbsp; and  <a href="https://www.jamb.org.ng/" target="_blank" rel="noopener noreferrer">U.T.M.E</a> Examinations.
            </p>

            <hr className="my-4"/>
            <a  href="https://play.google.com/store/apps/details?id=matimatiks.matimatiks">
              <img id="android"  src={andlogo} className="rounded mx-auto d-block" alt="Get it on Google Play" />
          </a>
      </div>

     <div>
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Downloads;
