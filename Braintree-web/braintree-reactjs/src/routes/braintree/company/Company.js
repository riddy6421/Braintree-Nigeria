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
          
      </div>


     <div className="container-fluid">
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Company;