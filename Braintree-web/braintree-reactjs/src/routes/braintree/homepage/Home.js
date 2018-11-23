import React, { Component } from 'react';
import './Home.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import pic from './apple.jpg';
import img from './Blogo.png';


class Home extends Component {

    constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }


  componentDidMount(){

    document.body.style.backgroundColor = "DarkSlateBlue";
    var x = document.getElementById("bg");
    var y = document.getElementById("foot");
    var size = window.innerWidth;
    

    if(size >= 1200){
      x.style.height = window.screen.availHeight+"px";
       if(/Firefox/.test(navigator.userAgent))
           y.style.marginTop = 5+"px";
      else if( !/Edge/.test(navigator.userAgent))
           y.style.marginTop = 40+"px";
    }
    this.wait(1000);
  }

  start(){
    window.location.href="/getStarted";
  }

  wait(ms){
  document.getElementById("page").style.visibility = "hidden";
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
  document.getElementById("page").style.visibility = "visible";
}

  render(){

    return ( 
        <div id="page">
     
      <div className="container-fluid">
        <Header/>
      </div>


        <div className="jumbotron-fluid">

          <img id="bg" src={pic} className="img-fluid" alt="Responsive"/>
          <div id="foot" className="jumbotron-fluid">
          <Footer/>
        </div>

         <div className="container-fluid text-center">
            <p> Serving and Preparing Millions Of Students</p>
            <p> For the utmost best</p>
            <p id="nj"> By Nigerians. For Everyone.</p>
        </div>

        <button id="btn" onClick={this.start} className="container-fluid btn justify-content-center" type="submit">Get Started</button>

      </div>


        


       </div>
  );
  }
}
export default Home;
