import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Questions.css';
import $ from 'jquery';
import firebase, { auth, provider, db} from '../firebase-config.js';


class Questions extends Component {

   constructor() {
    super();
    this.state = {
      storage:null,
      mode:-1,
      topic:-1,
      random:null
    }
   this.getfile = this.getfile.bind(this);
  }


  componentWillMount(){

   this.setState({storage:firebase.storage().ref()})
   this.setState({mode:this.props.mode})
   this.setState({topic:this.props.topic})
   this.setState({random:this.props.rand})

}

 getfile(query, img){

   this.state.storage.child(query).getDownloadURL().then(function(url) {
   // `url` is the download URL for 'images/stars.jpg'
             // This can be downloaded directly:
             var xhr = new XMLHttpRequest();
             xhr.responseType = 'blob';
             xhr.onload = function(event) {
               var blob = xhr.response;
             };
             xhr.open('GET', url);
             xhr.send();

             // Or inserted into an <img> element:
             img.src = url;

              setTimeout(function(){

                $("#roller").css("visibility", "hidden");
                document.getElementById('radio').style.visibility = "visible"
                document.getElementById('head').style.visibility = "visible"
                document.getElementById('Qno').style.visibility = "visible"
            //    document.getElementById('next').style.visibility = "visible"
            //    document.getElementById('prev').style.visibility = "visible"
                img.style.visibility= "visible"

              }, 3000);



           }).catch(function(error) {
             // Handle any error

           });



 }

 componentDidMount(){

   if(this.state.mode == 0 && this.state.topic == 1){

     var img = document.getElementById('mode2');

     var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[0]+".jpg"

     this.getfile(query,img)

   }

 }


  render() {

    if(this.state.mode == 0 && this.state.topic == 1){

      return(<div>

        <div>
          <Header login={this.props.login} name={this.props.name}/>
        </div>

        <div id="quest-cont" className="jumbotron-fluid">

        <div class=" container-fluid q-label d-flex justify-content-between">
          <button id="head" type="button" class="btn btn-primary "disabled>Practice Questions</button>
          <button id="Qno" type="button" class="btn btn-primary "disabled>Q1</button>
          <h1 id="dummy" className="Bootstrap heading">dummy</h1>
        </div>

         <div id="roller" class="d-flex justify-content-center">
             <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
         </div>
           <div id="ques-text">Loading...</div>
         </div>



        <div class="d-flex justify-content-around">
        <a id="prev">&#10094;</a>
         <img id="mode2" class="rounded d-block" alt=""/>
        <a id="next">&#10095;</a>
      </div>





         <div id="radio" class="d-flex justify-content-center">

        <button id="bt1" type="button" class="btn btn-outline-primary">A</button>
        <button id="bt2" type="button" class="btn btn-outline-secondary">B</button>
        <button id="bt3" type="button" class="btn btn-outline-success">C</button>
        <button id="bt4" type="button" class="btn btn-outline-danger">D</button>

         </div>

        </div>


        <div>
          <Footer/>
        </div>

        </div>)
    }

  else
   return(<div></div>)
}

}

export default Questions;
