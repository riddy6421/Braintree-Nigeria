import React, { Component } from 'react';
import './GetStarted.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import matlogo from '../downloads/mat_img_launch.png';
import $ from 'jquery';

class GetStarted extends Component {

	componentDidMount(){

   // $( "#body" ).after( $( "#ftg" ) );
    document.body.style.backgroundColor = "DarkSlateBlue";

  }

	  render(){
    return ( 
        <div>

        <div className="container-fluid">
           <Header/>
        </div>

        <div id="body" className="jumbotron">
      	 <div id="select" className="container text-center">
            <h1>Select From Our Application(s)</h1>
            <h1>Below!</h1>
           </div>

		<div className="card container justify-content-center">
  			<img className="card-img-top" src={matlogo} alt="Card image cap"/>
  			<div className="card-body">
   				 <h4 className="card-title">Matimatiks</h4>
    			 <p className="card-text">A personalized Mathematics tutorial app for W.A.E.C, U.T.M.E, and N.E.C.O Examinations</p>
    		<a href="/Matimatiks" className="btn btn-primary">Launch</a>
  			</div>
		</div>


         </div>


     <div id="ftg" className="container-fluid">
          <Footer/>
     </div>

      </div>
	   );
	}




}

export default GetStarted;