import React, { Component } from 'react';
import './Company.css';
import Head from '../../Head/Head';
import Footer from '../../Footer/Footer';



class Company extends Component {

  componentDidMount(){

  }

  render(){
    return (
        <div>
        <div>
           <Head color={1}/>
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


     <div>
          <Footer/>
     </div>

      </div>
	   );
	}
}
export default Company;
