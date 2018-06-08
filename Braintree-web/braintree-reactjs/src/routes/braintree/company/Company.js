import React, { Component } from 'react';
import './Company.css';
import Header from '../../Header/Header.js';
import Footer from '../../Footer/Footer.js';



class Company extends Component {

  render(){
    return ( 
        <div>

        <div className="container-fluid">
           <Header/>
        </div>

      <div className="jumbotron">
           <h1 id="about" className="display-8">About us</h1>
            <p id="statement" className="lead">
                &nbsp; &nbsp; We are group of concerned Nigerians who are passionate about the enhancement of the quality of education in Nigeria and
                Africa. Our main goal is to provide a technological approach to the way students learn and prepare for academic examinations
               throughout Africa. 
            </p>
  
            <hr className="my-4"/>
      </div>


     <div className="container-fluid">
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Company;