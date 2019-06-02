import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer';
import './Result.css';
import waeclogo from './waec-web.png';
import Analysis from '../Analysis/Analysis.js'
import Questions from '../Questions/Questions.js'
import $ from 'jquery';
import {onAuth,db} from '../firebase-config.js';



class Result extends Component {


  constructor(){
    super();

    this.state = {
     result:null,
     score:0,
     nof:0,
     time:0,
     review:false,
     Analysis:false,
     visited:null,
     total_time:null
    }
     this.processResult = this.processResult.bind(this);
  }

  componentWillMount(){
    this.setState({result:this.props.answers})
    this.setState({nof:50})
    this.setState({review:this.props.review})
    this.setState({visited:this.props.visited})
  }

  componentDidMount(){
     var that = this
     window.scrollTo(0,0)

     if(!this.state.review)
        this.processResult();

     $('#result-title').addClass('animated rubberBand');
     $('#result-cont').addClass('animated fadeIn');

     $('#b2q').addClass('animated fadeIn');
     $('#req').addClass('animated fadeIn');

     document.getElementById("b2q").addEventListener("click",function () {

        that.setState({review:true})

     })

     document.getElementById("rec").addEventListener("click",function () {

      that.setState({Analysis:true})

     })

  }


 processResult(){
   var that = this
   var scorestamps, score = 0, total_time;
   for(var i=0; i<this.state.result.size; i++){
        if(this.state.result.get(i+1)){
           score++
        }
   }
   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();

   var presentDay=dd+":"+mm+":"+yyyy

   var timeUsed = (this.props.allowedTime*1000) - this.props.time

   var hr = Math.floor(((timeUsed / (1000 * 60 * 60)) % 24))

   var min = Math.floor(((timeUsed/(1000*60))%60))

   var sec = Math.floor((timeUsed/1000) % 60)

   total_time = hr+"hr(s):"+min+"min(s):"+sec+"sec(s)"

   if(min >= 50)
      document.getElementById("rs2").innerHTML = "Time: Entire time was exhausted."

   scorestamps = score+" "+presentDay+" "+total_time+" "+this.props.exam

      var user = onAuth.currentUser

      var userRef = db.collection('users').doc(user.uid);

      var userScore = 0

      // get number of user score
      userRef.get().then(function(doc){

      if(doc.data().score != null)
         userScore = Object.getOwnPropertyNames(doc.data().score).length

         //update scorestamp object
         if(userScore > 0){
           var setWithMerge = userRef.set({
               score:{["scorestamp"+(userScore+1)]:scorestamps}
             }, { merge: true });
         }

         else{
           userRef.set({
             score:{["scorestamp1"]:scorestamps}
           })

         }

      })

      userRef.onSnapshot(function(doc) {
        if(userScore != 0)
            var res = doc.data().score["scorestamp"+((Number(userScore)+1).toString())]

        if(res != undefined){
        var items = res.split(" ")
        that.setState({score:items[0]})
        that.setState({total_time:items[2]})
      }

    });


   var mark = document.getElementById("score")

   if(score >= 40 && score <= 50)
       mark.style.color = "LawnGreen"
   else if(score > 25 && score < 40)
       mark.style.color = "Gold"
   else
      mark.style.color = "red"

 }


  render() {
    if(!this.state.review && !this.state.Analysis){
    return(
    <div>

    <div>
      <Header login={this.props.login} name={this.props.name}/>
    </div>

    <div id="result-body" className="container-fluid">

    <div id="result-title" className="d-flex justify-content-center">Summary</div>

    <div id="result-cont" className="jumbotron container">
    <p id ="rs1"><em id="title">Score: </em>You got <em id="score">{this.state.score}</em> out of <em id="nof">{this.state.nof}</em> questions correct</p>
    <p id ="rs2"><em id="title">Time: </em>Your total time used was: <em id="time">{this.state.total_time}</em></p>
    <p id ="rs3"><em id="title">Exam Category: </em><button id="exam-type" type="button" className="btn btn-warning"disabled><img className="img" src={waeclogo} alt="Card cap"/> W.A.E.C</button></p>
    </div>

   <div  className="d-flex justify-content-center">
    <button id="b2q" type="button" className="btn btn-secondary">Review Answers</button>
    <button id="rec" type="button" className="btn btn-primary">Result Analysis & Recommendation</button>
   </div>

    </div>

    <div>
      <Footer/>
    </div>

    </div>
  )
  }
  if (this.state.review) {
    return(<Questions login={this.props.login} name={this.props.name} rand={this.props.random} review={this.state.review}
       continue={this.props.continue} mode={this.props.mode} answers={this.state.result} response={this.props.response} />)
  }

  else if(this.state.Analysis){
      return(<Analysis login={this.props.login} name={this.props.name} answers={this.state.result} random={this.props.random} visited={this.state.visited} score={this.state.score} />)
   }
}

}

export default Result;
