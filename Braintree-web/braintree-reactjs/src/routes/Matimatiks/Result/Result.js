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
     review:null,
     Analysis:false,
     rand:null,
     visited:null,
     topicstamps:[],
     total_time:null
    }
     this.processResult = this.processResult.bind(this);
     this.computeTopicScore = this.computeTopicScore.bind(this);
  }

  componentWillMount(){
    this.setState({result:this.props.answers})
    this.setState({nof:50})
    this.setState({review:this.props.review})
    this.setState({visited:this.props.visited})
    this.setState({rand:this.props.random})
  }

  componentDidMount(){
     var that = this
     window.scrollTo(0,0)

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
   this.computeTopicScore();
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

      var  res, sc

       var userScore = -1

//Read data base to check scoreList
      userRef.get().then(function(doc) {

  if (doc.exists) {

/* if score exists add a new another score */
        if(doc.data().score != undefined){

           userScore = Object.getOwnPropertyNames(doc.data().score).length
           res = doc.data().score["scorestamp"+((Number(userScore)).toString())]

           userScore /= 2;

           var setWithMerge = userRef.set({
              score:{["scorestamp"+(userScore+1)]:scorestamps,["topicstamp"+(userScore+1)]:that.state.topicstamps}
            }, { merge: true });

        }

        else{

          userScore = 0
          
          userRef.update({
              score:{["scorestamp"+(userScore+1)]:scorestamps,["topicstamp"+(userScore+1)]:that.state.topicstamps}
            }).then(function() {
            }).catch(function(error){
                alert("ERROR "+error)
          });

        }


        if(res != undefined){
             var items = res.split(" ")
             that.setState({score:items[0]})
             that.setState({total_time:items[2]})
         }

         else{

           userRef.onSnapshot(function(doc) {

            res = doc.data().score["scorestamp1"]

            var items = res.split(" ")
            that.setState({score:items[0]})
            that.setState({total_time:items[2]})

            });

    }


}
}).catch(function(error) {
    alert("Error getting document:"+ error);
});


console.log("userScore "+userScore)


   var mark = document.getElementById("score")

   if(score >= 40 && score <= 50)
       mark.style.color = "LawnGreen"
   else if(score > 25 && score < 40)
       mark.style.color = "Gold"
   else
      mark.style.color = "red"

 }


 computeTopicScore(){
   var alg = new Array(8, 9, 10, 11, 12, 34, 38, 39, 40) , geo = new Array(16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 33, 46, 48, 50),
   stats = new Array(27, 28, 29, 35, 44, 47), sl = new Array(31, 42, 49), mens = new Array(13, 14, 15, 36, 45), int = new Array(1, 2, 3, 4, 5, 6, 7, 32, 37, 41)

   var alg_v = [],geo_v =[],stats_v =[],sl_v=[],mens_v=[],int_v=[]
   var alg_sc=0, geo_sc=0, stat_sc=0,sl_sc=0,mens_sc = 0,int_sc=0;
   var that = this
   var i



   for(i=0; i<this.state.rand.length; i++){
      if(this.state.visited.get(i+1)){
         alg.forEach(function (element) {
           if(element == that.state.rand[i]){
               alg_v.push(that.state.rand[i])
           }
         })
       }
     }

     for(var j=0; j<alg_v.length;j++){
       if(that.state.result.get(alg_v[j]))
            alg_sc++;
     }

     that.state.topicstamps.push("ALG"+" "+alg_v.length+" "+alg_sc+"\n")

     for(i=0; i<this.state.rand.length; i++){
       if(this.state.visited.get(i+1)){
         geo.forEach(function (element) {
           if(element == that.state.rand[i])
             geo_v.push(that.state.rand[i])
         })
       }
     }

     for(var j=0; j<geo_v.length;j++){
       if(that.state.result.get(geo_v[j]))
            geo_sc++;
     }

    that.state.topicstamps.push("GEO"+" "+geo_v.length+" "+geo_sc+"\n")

     for(i=0; i<this.state.rand.length; i++){
       if(this.state.visited.get(i+1)){
         stats.forEach(function (element) {
           if(element == that.state.rand[i])
               stats_v.push(that.state.rand[i])
         })
       }
     }

    for(var j=0; j<stats_v.length;j++){
     if(that.state.result.get(stats_v[j]))
       stat_sc++;
     }

     that.state.topicstamps.push("STATS"+" "+stats_v.length+" "+stat_sc+"\n")

       for(i=0; i<this.state.rand.length; i++){
         if(this.state.visited.get(i+1)){
         sl.forEach(function (element) {
           if(element == that.state.rand[i])
             sl_v.push(that.state.rand[i])
         })
       }
     }

     for(var j=0; j<sl_v.length;j++){
      if(that.state.result.get(sl_v[j]))
        sl_sc++;
      }

      that.state.topicstamps.push("S&L"+" "+sl_v.length+" "+sl_sc+"\n")

       for(i=0; i<this.state.rand.length; i++){
         if(this.state.visited.get(i+1)){
         mens.forEach(function (element) {
           if(element == that.state.rand[i])
             mens_v.push(that.state.rand[i])
         })
      }
    }

  for(var j=0; j<mens_v.length;j++){
    if(that.state.result.get(mens_v[j]))
       mens_sc++;
    }

    that.state.topicstamps.push("MENS"+" "+mens_v.length+" "+mens_sc+"\n")

    for(i=0; i<this.state.rand.length; i++){
      if(this.state.visited.get(i+1)){
      int.forEach(function (element) {
        if(element == that.state.rand[i])
          int_v.push(that.state.rand[i])
      })
   }
 }
for(var j=0; j<int_v.length;j++){
 if(that.state.result.get(int_v[j]))
   int_sc++;
 }


  that.state.topicstamps.push("INT"+" "+int_v.length+" "+int_sc+"\n")

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
else if (this.state.review && !this.state.Analysis) {
    return(<Questions login={this.props.login} name={this.props.name} rand={this.props.random} review={this.state.review}
       continue={this.props.continue} mode={this.props.mode} answers={this.state.result} response={this.props.response} />)
  }

  else if(!this.state.review && this.state.Analysis){
     return(<Analysis login={this.props.login} name={this.props.name} answers={this.state.result} random={this.props.random} visited={this.state.visited} score={this.state.score} />)
  }

   else{
     return(<div></div>)
   }
}

}

export default Result;
