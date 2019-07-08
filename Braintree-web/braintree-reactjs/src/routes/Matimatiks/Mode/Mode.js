import React, { Component } from 'react';
import './Mode.css';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import $ from 'jquery';
import Questions from '../Questions/Questions.js';
import waeclogo from './waec-web.png';
import Modal from 'react-bootstrap/Modal'
import {onAuth,db} from '../firebase-config.js';



class Mode extends Component {

  constructor(){

    super();

    this.state = {
      name: null,
      mode:-1,
      login:null,
      continue:-1,
      exam:-1,
      random:null,
      topic:0
    }

    this.generateRandom = this.generateRandom.bind(this);
  }

  componentWillMount(){

 this.setState({login:this.props.login})
 this.setState({random:[]})
 this.setState({continue:0})
 this.setState({exam:0})

 if(this.props.mode == undefined)
    this.setState({mode:-1})
 else
   this.setState({mode:this.props.mode})

}



  componentDidMount(){

    var that = this
     window.sessionStorage.setItem('user',onAuth.currentUser.uid)

       window.scrollTo(0,0);

           // eslint-disable-next-line
        if((this.state.login && this.state.mode == -1)){// logged in & page status ok?

                this.setState({name:this.props.name});

                document.getElementById('card1-btn').addEventListener("click", function(){

                 $('#mode-main').addClass('animated fadeOut');//set fadeOut animation to card when button is clicked


                 var animationEnd = (function(el) {
                 var animations = {
                   animation: 'animationend',
                   OAnimation: 'oAnimationEnd',
                   MozAnimation: 'mozAnimationEnd',
                   WebkitAnimation: 'webkitAnimationEnd',
                 };

                 for (var t in animations) {
                   if (el.style[t] !== undefined) {
                     return animations[t];
                   }
                 }
               })(document.createElement('div'));

               $('#mode-main').one(animationEnd, function(){

                 that.setState({mode:0})//set mode 0 clicked when animation ends

                   $('#mode2-cont').addClass('animated fadeIn');

                   /*Set click listeners to all topic buttons*/
                   document.getElementById('alg').addEventListener("click",function () {

                       that.setState({topic:1})

                   })

                   document.getElementById('geo').addEventListener("click",function () {

                       that.setState({topic:2})

                   })

                   document.getElementById('stat').addEventListener("click",function () {

                       that.setState({topic:3})

                   })

                   document.getElementById('mens').addEventListener("click",function () {

                       that.setState({topic:4})

                   })

                   document.getElementById('int').addEventListener("click",function () {

                       that.setState({topic:5})

                   })

                   document.getElementById('s&l').addEventListener("click",function () {

                       that.setState({topic:6})

                   })

               });

                })//card 1 click

                document.getElementById('card2-btn').addEventListener("click", function(){
                  $('#mode-main').addClass('animated fadeOut');


                  var animationEnd = (function(el) {
                  var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                  };

                  for (var t in animations) {
                    if (el.style[t] !== undefined) {
                      return animations[t];
                    }
                  }
                })(document.createElement('div'));

                $('#mode-main').one(animationEnd, function(){

                       that.setState({mode:1})

                    document.getElementById("launch-btn").addEventListener("click", function () {

                        that.setState({exam:1});

                     })

                     document.getElementById("close-btn").addEventListener("click", function () {

                       window.location.reload()

                      })

                });

              })//card 2 click end
        }

          if (this.state.login && this.state.mode == 0) {

          /*Set click listeners to all topic buttons*/
          document.getElementById('alg').addEventListener("click",function () {

              that.setState({topic:1})

          })

          document.getElementById('geo').addEventListener("click",function () {

              that.setState({topic:2})

          })

          document.getElementById('stat').addEventListener("click",function () {

              that.setState({topic:3})

          })

          document.getElementById('mens').addEventListener("click",function () {

              that.setState({topic:4})

          })

          document.getElementById('int').addEventListener("click",function () {

              that.setState({topic:5})

          })

          document.getElementById('s&l').addEventListener("click",function () {

              that.setState({topic:6})

          })

        }
  }


componentDidUpdate(){
  var that = this
  // eslint-disable-next-line
  if(this.state.exam == 1 && this.state.continue == 0){
    document.getElementById("begin").addEventListener("click", function () {

        that.setState({continue:1});

      })

      document.getElementById("cancel").addEventListener("click", function () {

        window.location.reload()

      })
}
}

  generateRandom(nof){
    var randMap = new Map();


    for(var i=1; i<=nof; i++)
         randMap.set(i,false)

    var num = Math.floor((Math.random() * nof) + 1)
    this.state.random.push(num)

    randMap.set(num,true)

    while(1){ //check inifitely and make sure the next number in the array isnt repeated
      num = Math.floor((Math.random() * nof) + 1)
      if(!randMap.get(num)){
         this.state.random.push(num)
         randMap.set(num,true)
      }
// eslint-disable-next-line
      if(this.state.random.length == nof)
         break;
    }

  }



  render(){

// eslint-disable-next-line
    if((this.state.login && this.state.mode == -1)){// page status ok?

       return (
           <div>

           <div>
             <Header login={this.state.login} name={this.props.name}/>
           </div>


           <div id="mode-main" className="jumbotron-fluid">

           <div className="container d-flex justify-content-center">
              <h1 id="sl" className="text-primary">Select Exam Mode</h1>
           </div>


           <div className="container-fluid d-flex justify-content-center">

           <div id="card1" className="card text-white bg-primary mb-3" >
             <div className="card-header">Mode A</div>
             <div className="card-body">
             <h5 className="card-title">Practice Exam Questions</h5>
             <p className="card-text">In this mode, the exam is untimed. Practice questions pertaning to different math topics are available.</p>
             <button id="card1-btn" type="button" className="btn btn-outline-dark">Launch</button>
            </div>
            </div>


           <div id="card2" className="card text-white bg-success mb-3">
             <div className="card-header">Mode B</div>
             <div className="card-body">
             <h5 className="card-title">Mock Exam</h5>
             <p className="card-text">In this mode, the exam is timed and results are computed strategically to determing your strength and/or weakneses</p>
             <button id="card2-btn" type="button" className="btn btn-outline-dark">Launch</button>
           </div>
         </div>
         </div>
   </div>

         <div>
           <Footer/>
         </div>

          </div>
   	   );

      }
// eslint-disable-next-line
else if (this.state.login && this.state.mode == 0){// practice question mode clicked?
// eslint-disable-next-line
   if(this.state.topic == 1){// if algebra topic is clicked (temp)
        this.generateRandom(2)
        return(<Questions mode={this.state.mode} topic={this.state.topic} rand={this.state.random} name={this.state.name} login={this.state.login} continue={this.state.continue}/>)
      }

     //// TODO: other topics
    else{

     return (
       <div>

       <div>
         <Header login={this.props.login} name={this.props.name}/>
       </div>

       <div id="mode2-cont" className="jumbotron">

       <div id ="s-mode" className="d-flex justify-content-center text-primary">Practice Question Mode</div>

{/*card groub 1*/}
       <div id="math-cards-1" className="d-flex justify-content-center">
          <button id="alg"  type="button" className="btn btn-primary btn-lg">Algebra</button>
          <button id="geo" type="button" className="btn btn-warning btn-lg">Geometry</button>
      </div>

{/*card groub 2*/}
     <div id="math-cards-2" className="d-flex justify-content-center">
      <button id="stat" type="button" className="btn btn-secondary btn-lg">Statistics</button>
      <button id="mens" type="button" className="btn btn-info btn-lg">Mensuration</button>
   </div>

{/*card groub 3*/}
   <div id="math-cards-3" className="d-flex justify-content-center">
    <button id="int" type="button" className="btn btn-danger btn-lg">Integers</button>
    <button id="s&l" type="button" className="btn btn-success btn-lg">Sets & Logic</button>
</div>
{/*card groub end*/}


</div>
      <div>
         <Footer/>
       </div>

       </div>
     )
   }
}
// eslint-disable-next-line
  else if(this.state.login && this.state.mode == 1){//Exam Mode

// eslint-disable-next-line
     if(this.state.continue == 0 && this.state.exam == 0){
       return(
       <div>
       <div>
         <Header login={this.props.login} name={this.props.name}/>
       </div>

       <div id="card-exam" className="card container justify-content-center bg-warning">
           <img className="card-img-top" src={waeclogo} alt="Card cap"/>
           <div className="card-body">
              <h4 className="card-title">W.A.E.C</h4>
              <p className="card-text">This module consists of W.A.E.C standard mathematics questions</p>
           <button id="launch-btn" className="btn btn-light">Launch</button>
           </div>
       </div>

       <div id="neg" className="d-flex justify-content-center">
         <button id="close-btn" className="btn btn-danger">Exit</button>
       </div>

        </div>
      );
     }
// eslint-disable-next-line
     else if(this.state.continue == 0 && this.state.exam == 1){
       return(
                <div id="bg">
                 <Modal.Dialog>
                   <Modal.Header id="modal-hd">
                     <Modal.Title>Matimatiks</Modal.Title>
                   </Modal.Header>

                   <Modal.Body id="modal-bd">
                     <p>
                       In this mode there are 50 questions, and you would be required to complete the questions under 50
                       minutes. Click the submit button only when you are done with the exam, after which the questions would be closed. This is a model of a
                       live exam scenario. Click continue to start. Goodluck!
                     </p>
                   </Modal.Body>

                   <Modal.Footer>
                    <button id="cancel" type="button" className="btn btn-outline-danger">Close</button>
                    <button id="begin" type="button" className="btn btn-outline-primary">Continue</button>
                   </Modal.Footer>
                 </Modal.Dialog>
                 </div>
       );
     }
// eslint-disable-next-line
   else if(this.state.continue == 1 && this.state.exam == 1){
     this.generateRandom(50);
     return(<Questions mode={this.state.mode} topic={this.state.topic} rand={this.state.random} name={this.state.name}
        login={this.state.login} continue={this.state.continue} exam={this.state.exam} />);
  }


  } //Mock exam mode clicked

// eslint-disable-next-line
   else if(this.state.status == -1){
        return(<div>
         <div>
           <Header/>
         </div>
         </div>
       )
   }

   else{return(<div></div>)}// if status code isn't of return empty page

	}

}

export default Mode;
