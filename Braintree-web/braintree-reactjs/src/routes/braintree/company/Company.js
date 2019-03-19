import React, { Component } from 'react';
import './Company.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';



class Company extends Component {

  componentDidMount(){

  var  x = document.getElementById("jum")
  var  y = document.getElementById("ft")

 if(window.screen.availHeight >= 728){
      x.style.height = window.screen.availHeight+"px";
     y.style.marginTop = 60+"px";
    }

  }

  render(){
    return (
        <div>
        <div id="hd" className="container-fluid">
           <Header/>
        </div>

      <div id="jum" className="jumbotron">
           <h1 id="about" className="display-8">About us</h1>
            <p id="statement" className="lead">
                &nbsp; &nbsp; We are a group of concerned Nigerians who are passionate about the enhancement of the quality of education in Nigeria and
                Africa. Our main goal is to provide a technological approach to the way students learn and prepare for academic examinations
               throughout Africa.
            </p>

            <hr className="my-4"/>
      </div>


     <div id="ft" className="container-fluid">
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Company;
