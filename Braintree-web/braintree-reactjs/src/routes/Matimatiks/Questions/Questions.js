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
      start:0,
      Qno:-1,
      random:null
    }
   this.getfile = this.getfile.bind(this);
   this.nextOperation = this.nextOperation.bind(this);
   this.prevOperation = this.prevOperation.bind(this);
  }


  componentWillMount(){
   this.setState({storage:firebase.storage().ref()})
   this.setState({mode:this.props.mode})
   this.setState({topic:this.props.topic})
   this.setState({random:this.props.rand})
   this.setState({Qno:0})
}

 getfile(query, img){
   var that = this;
   var num =  that.state.Qno;
   var nof = that.state.random.length;
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

  if(that.state.start==0){
              setTimeout(function(){

                img.style.visibility= "visible"


                    document.getElementById('roller').style.visibility = "hidden"
                    document.getElementById('radio').style.visibility = "visible"
                    document.getElementById('head').style.visibility = "visible"
                    document.getElementById('Qno').style.visibility = "visible"


                  document.getElementById('Qno').innerHTML = "Q"+(num+1);

                    if(num > 0){
                       document.getElementById('prv').style.visibility = "visible"
                    }
                    else{
                        document.getElementById('prv').style.visibility = "hidden"
                    }

                    if(num < (nof-1))
                        document.getElementById('nxt').style.visibility = "visible";
                    else
                        document.getElementById('nxt').style.visibility = "hidden"


              }, 2000);

}

else{
  document.getElementById('Qno').innerHTML = "Q"+(num+1);

    if(num > 0){
       document.getElementById('prv').style.visibility = "visible"
    }
    else{
        document.getElementById('prv').style.visibility = "hidden"
    }

    if(num < (nof-1))
        document.getElementById('nxt').style.visibility = "visible";
    else
        document.getElementById('nxt').style.visibility = "hidden"

}

}).catch(function(error) {
  // Handle any error

});


}

nextOperation(){
  var num =  this.state.Qno;
  var nof = this.state.random.length;
  var img = document.getElementById('mode2');
  this.state.start++;

if(num < nof){
  this.state.Qno++;
  var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[num]+".jpg"
  this.getfile(query,img)
}
}

prevOperation(){
  var num =  this.state.Qno;
  var nof = this.state.random.length
  var img = document.getElementById('mode2');
  this.state.start++;

  if(num >= 0){
    if(num > 0)
      this.state.Qno--;
    var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[num]+".jpg"
    this.getfile(query,img)
  }
}

 componentDidMount(){

   if(this.state.mode == 0 && this.state.topic == 1){

      document.getElementById('Qno').innerHTML = "Q"+(this.state.Qno+1);

     var img = document.getElementById('mode2');

     var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[0]+".jpg"

     this.getfile(query,img)

     var that = this

     document.getElementById("nxt").addEventListener("click", function () {
           that.nextOperation()
     })

     document.getElementById("prv").addEventListener("click", function () {
           that.prevOperation()
     })

   }

 }


  render() {

    if(this.state.mode == 0 && this.state.topic == 1){

      return(<div>

        <div>
          <Header login={this.props.login} name={this.props.name}/>
        </div>

        <div id="quest-cont" className="jumbotron-fluid">

        <div class="container-fluid q-label d-flex justify-content-between">
          <button id="head" type="button" class="btn btn-primary "disabled>Practice Questions</button>
          <button id="Qno" type="button" class="btn btn-primary "disabled></button>
          <h1 id="dummy" className="Bootstrap heading">dummy</h1>
        </div>

         <div id="roller" class="d-flex justify-content-center">
             <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
         </div>
           <div id="ques-text">Loading...</div>
         </div>


         <div className="d-flex justify-content-center container">

          <div  id="prv" className="triangle-left"></div>

          <img id="mode2"  className="rounded mx-auto d-block" alt=""/>

           <div id="nxt" className="triangle-right"></div>

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
