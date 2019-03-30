import React, { Component } from 'react';
import './Mode.css';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import $ from 'jquery';
import Questions from '../Questions/Questions.js';


class Mode extends Component {


  constructor(){

    super();

    this.state = {
      name: null,
      mode:-1,
      login:null,
      topic:0
    }
  }

  componentWillMount(){

 this.setState({login:this.props.login})

}


  componentDidMount(){

        if(this.state.login && this.state.mode == -1){// page status ok?

                this.setState({name:this.props.name});

               var that = this

                document.getElementById('card1').addEventListener("click", function(){

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

                   document.getElementById('trig').addEventListener("click",function () {

                       that.setState({topic:5})

                   })

                   document.getElementById('s&l').addEventListener("click",function () {

                       that.setState({topic:6})

                   })

               });

                })//card 1 click

                document.getElementById('card2').addEventListener("click", function(){
                  $('#mode-main').addClass('animated fadeOutLeftBig');


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

                });

                })//card 2 click

        }

  }



  render(){

    if(this.state.login && this.state.mode == -1){// page status ok?

       return (
           <div>
           <div>
             <Header login={this.state.login} name={this.props.name}/>
           </div>


           <div id="mode-main" className="jumbotron-fluid">

           <div className="container d-flex justify-content-center">
              <h1 id="sl">Select Exam Mode</h1>
           </div>


           <div className="container-fluid d-flex justify-content-center">

           <div id="card1" class="card text-white bg-primary mb-3" >
             <div class="card-header">Mode A</div>
             <div class="card-body">
             <h5 class="card-title">Practice Exam Questions</h5>
             <p class="card-text">In this mode, the exam is untimed. Practice questions pertaning to different math topics are available.</p>
             <button id="card1-btn" type="button" class="btn btn-outline-dark">Launch</button>
            </div>
            </div>


           <div id="card2" class="card text-white bg-success mb-3">
             <div class="card-header">Mode B</div>
             <div class="card-body">
             <h5 class="card-title">Mock Exam</h5>
             <p class="card-text">In this mode, the exam is timed and results are computed strategically to determing your strength and/or weakneses</p>
             <button id="card2-btn" type="button" class="btn btn-outline-dark">Launch</button>
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

else if (this.state.login && this.state.mode == 0){// practice question mode clicked?

   if(this.state.topic == 1 || this.state.topic == 2 ||
      this.state.topic == 3 || this.state.topic == 4 ||
      this.state.topic == 5 || this.state.topic == 6 ){// if any topic is clicked

       var random = [], num, nof = 2, randMap = new Map();

       for(var i=1; i<=nof; i++)
            randMap.set(i,false)

       num = Math.floor((Math.random() * nof) + 1)
       random.push(num)

       randMap.set(num,true)

       while(1){ //check inifitely and make sure the next number in the array isnt repeated
         num = Math.floor((Math.random() * nof) + 1)
         if(!randMap.get(num)){
            random.push(num)
            randMap.set(num,true)
         }

         if(random.length == nof)
            break;
       }
        return(<Questions mode={this.state.mode} topic={this.state.topic} rand={random} name={this.props.name} login={this.props.login}/>)
      }

    else{

     return (
       <div>

       <div>
         <Header/>
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
    <button id="trig" type="button" className="btn btn-danger btn-lg">Trigonometry</button>
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

//  else if(this.state.mode == 1) //Mock exam mode clicked


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
