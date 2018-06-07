import React, { Component } from 'react';
import './Home.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import pic from './apple.jpg';
import img from './Blogo.png';

class Home extends Component {

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
            <h1>Serving and Preparing Thousands of Students</h1>
            <h1>For The Utmost Best</h1>
           </div>

          

       <div id="mid"  className="container justify-content-center align-items-center">
        <button type="button" class="btn btn-primary btn-lg btn-block">Get started</button>
       </div>


        <div id="foot" className="container-fluid">
          <Footer/>
        </div>


       </div>
  );
  }
}
export default Home;
