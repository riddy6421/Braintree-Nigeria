import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Questions.css';
import firebase, { auth, provider, db} from '../firebase-config.js';


class Questions extends Component {

   constructor() {
    super();
    this.state = {
      storage:null,
      mode:-1,
      topic:-1,
      subject:null,
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

           }).catch(function(error) {
             // Handle any errors
           });
 }

  componentDidMount(){

    var img = document.getElementById('mode2');

    if(this.state.mode == 0 && this.state.topic == 1){

       var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[0]+".jpg"
       this.setState({subject:"alg"})
       this.getfile(query,img)

    }

    //document.getElementById('bt-li').innerHTML = "Hi, "+this.props.name

 }
  render() {

    if(this.state.subject == "alg"){

      return(<div>

        <div className="container-fluid">
          <Header user={this.props.name} login={this.props.login} name={this.props.name}/>
        </div>

        <div id="quest-cont" className="jumbotron">

         <img id="mode2" class="rounded mx-auto d-block" alt="Image File"/>

        </div>


        <div className="container-fluid">
          <Footer/>
        </div>

        </div>)
    }

  else
   return(<div></div>)
}

}

export default Questions;
