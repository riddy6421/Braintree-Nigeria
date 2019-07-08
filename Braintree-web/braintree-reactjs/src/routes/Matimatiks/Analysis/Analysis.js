import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer';
import './Analysis.css';
import Questions from '../Questions/Questions.js'
import Progress from '../Progress/Progress.js'
import Mode from '../Mode/Mode.js';
import $ from 'jquery';
import {onAuth,db} from '../firebase-config.js';

class Analysis extends Component {

  constructor(){
    super();
    this.state = {
       alg:null,
       alg_score:-1,
       geo:null,
       geo_score:-1,
       stats:null,
       stats_score:-1,
       help:null,
       sl:null,
       sl_score:-1,
       int:null,
       int_score:-1,
       mens:null,
       topics:null,
       mens_score:-1,
       mode:-1,
       time:0,
       score:null,
       rand:null,
       visited:null,
       response_map:null
    }
      this.getScoreStamp = this.getScoreStamp.bind(this);
      this.setPercentages = this.setPercentages.bind(this);
      this.setScoreColor = this.setScoreColor.bind(this);
      this.setRecommendation = this.setRecommendation.bind(this);
  }

  componentWillMount(){
    this.setState({rand:this.props.random})
    this.setState({response_map:this.props.answers})
    this.setState({visited:this.props.visited})
    this.setState({help:[]})
    this.setState({score:this.props.score})

    if(this.props.mode == undefined)
       this.setState({mode:-2})

  }

  componentDidMount(){
    this.getScoreStamp()
  }

  getScoreStamp(){
    var user = onAuth.currentUser
    var userRef = db.collection('users').doc(user.uid);
    var userScore = 0;
    var that = this
    var prog = document.getElementById("prog")
    var prac = document.getElementById("prac")

    userRef.get().then(function(doc){

      if(doc.data().score != null)
         userScore = Object.getOwnPropertyNames(doc.data().score).length
    })

    userRef.onSnapshot(function(doc) {

if(userScore != 0)
      var res = doc.data().score["scorestamp"+((Number(userScore)+1).toString())]

      if(res != undefined){
      var items = res.split(" ")
        that.setState({time:items[2]})
    }

  });

  var alg = new Array(8, 9, 10, 11, 12, 34, 38, 39, 40) , geo = new Array(16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 33, 46, 48, 50),
  stats = new Array(27, 28, 29, 35, 44, 47), sl = new Array(31, 42, 49), mens = new Array(13, 14, 15, 36, 45), int = new Array(1, 2, 3, 4, 5, 6, 7, 32, 37, 41)

  var alg_v = [],geo_v =[],stats_v =[],sl_v=[],mens_v=[],int_v=[]
  var alg_sc=0, geo_sc=0, stat_sc=0,sl_sc=0,mens_sc = 0,int_sc=0;
  var that = this

  var i, next;

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
        if(that.state.response_map.get(alg_v[j]))
             alg_sc++;
      }


      for(i=0; i<this.state.rand.length; i++){
        if(this.state.visited.get(i+1)){
          geo.forEach(function (element) {
            if(element == that.state.rand[i])
              geo_v.push(that.state.rand[i])
          })
        }
      }

      for(var j=0; j<geo_v.length;j++){
        if(that.state.response_map.get(geo_v[j]))
             geo_sc++;
      }


      for(i=0; i<this.state.rand.length; i++){
        if(this.state.visited.get(i+1)){
          stats.forEach(function (element) {
            if(element == that.state.rand[i])
                stats_v.push(that.state.rand[i])
          })
        }
      }

     for(var j=0; j<stats_v.length;j++){
      if(that.state.response_map.get(stats_v[j]))
        stat_sc++;
      }

        for(i=0; i<this.state.rand.length; i++){
          if(this.state.visited.get(i+1)){
          sl.forEach(function (element) {
            if(element == that.state.rand[i])
              sl_v.push(that.state.rand[i])
          })
        }
      }

      for(var j=0; j<sl_v.length;j++){
       if(that.state.response_map.get(sl_v[j]))
         sl_sc++;
       }

        for(i=0; i<this.state.rand.length; i++){
          if(this.state.visited.get(i+1)){
          mens.forEach(function (element) {
            if(element == that.state.rand[i])
              mens_v.push(that.state.rand[i])
          })
       }
     }

   for(var j=0; j<mens_v.length;j++){
     if(that.state.response_map.get(mens_v[j]))
        mens_sc++;
     }

     for(i=0; i<this.state.rand.length; i++){
       if(this.state.visited.get(i+1)){
       int.forEach(function (element) {
         if(element == that.state.rand[i])
           int_v.push(that.state.rand[i])
       })
    }
  }
for(var j=0; j<int_v.length;j++){
  if(that.state.response_map.get(int_v[j]))
    int_sc++;
  }

    if(int_v.length > 2){
       var intp = Math.floor((int_sc/int_v.length)*100)
       this.setState({int_score:intp})
       console.log("Integer "+intp+ "length "+int_v.length);
    }
    else
      this.setState({int_score:-2})

    if(mens_v.length > 2){
      var mp = Math.floor((mens_sc/mens_v.length)*100)
      this.setState({mens_score:mp})
      console.log("mp "+mp);
    }

    else
      this.setState({mens_score:-2})

    if(sl_v.length > 2){
      var slp = Math.floor((sl_sc/sl_v.length)*100)
      this.setState({sl_score:slp})
      console.log("slp "+slp);
    }

    else
      this.setState({sl_score:-2})

    if(stats_v.lenght > 2){
      var stp = Math.floor((stat_sc/stats_v.length)*100)
      this.setState({stats_score:stp})
      console.log("stp "+stp);
    }

    else
      this.setState({stats_score:-2})

   if(geo_v.length > 2){
     var geop = Math.floor((geo_sc/geo_v.length)*100)
     this.setState({geo_score:geop})
     console.log("geop "+geop);
   }

   else
     this.setState({geo_score:-2})

   if(alg_v.length > 2){
     var algp = Math.floor((alg_sc/alg_v.length)*100)
     this.setState({alg_score:algp})
     console.log("algp "+algp);
   }

   else
     this.setState({alg_score:-2})

     prac.addEventListener("click", function () {
         that.setState({mode:0})
     })

     prog.addEventListener("click", function () {
      that.setState({mode:1})
     })

}


setPercentages(){

  if(this.state.alg_score > -2){
      document.getElementById('alg-prog').style.width = this.state.alg_score+"%"
      if(this.state.alg_score == 0)
          document.getElementById('alg-prog').style.width = "100%"
  }

  else
    document.getElementById('alg-prog').style.width = "100%"

  if(this.state.geo_score > -2){
    document.getElementById('geo-prog').style.width = this.state.geo_score+"%"
    if(this.state.geo_score == 0)
        document.getElementById('geo-prog').style.width = "100%"
  }
  else
    document.getElementById('geo-prog').style.width = "100%"

  if(this.state.stats_score > -2){
      document.getElementById('stat-prog').style.width = this.state.stats_score+"%"
    if(this.state.stats_score == 0)
        document.getElementById('stat-prog').style.width = "100%"
  }
  else
    document.getElementById('stat-prog').style.width = "100%"

  if(this.state.mens_score > -2){
    document.getElementById('mens-prog').style.width = this.state.mens_score+"%"
    if(this.state.mens_score == 0)
        document.getElementById('mens-prog').style.width = "100%"
  }
  else
    document.getElementById('mens-prog').style.width = "100%"

  if(this.state.int_score > -2){
    document.getElementById('int-prog').style.width = this.state.int_score+"%"
    if(this.state.int_score == 0)
        document.getElementById('int-prog').style.width = "100%"
  }
  else
     document.getElementById('int-prog').style.width = "100%"

  if(this.state.sl_score > -2){
    document.getElementById('slg-prog').style.width = this.state.sl_score+"%"
    if(this.state.sl_score == 0)
        document.getElementById('slg-prog').style.width = "100%"
  }
  else
     document.getElementById('slg-prog').style.width = "100%"

     this.setScoreColor(this.state.alg_score,document.getElementById('alg-prog'),"Algebra")
     this.setScoreColor(this.state.geo_score,document.getElementById('geo-prog'),"Geography")
     this.setScoreColor(this.state.stats_score,document.getElementById('stat-prog'),"Statistics")
     this.setScoreColor(this.state.mens_score,document.getElementById('mens-prog'),"Mensuration")
     this.setScoreColor(this.state.int_score,document.getElementById('int-prog'),"Integers")
     this.setScoreColor(this.state.sl_score,document.getElementById('slg-prog'),"Sets & Logic")

       this.setRecommendation()
}

setScoreColor(obj,color,topic){
  if(obj >= 70 && obj <= 100)
      color.style.backgroundColor = "LawnGreen"
  else if(obj > 50 && obj < 70)
      color.style.backgroundColor = "Gold"
  else if(obj <= 50 && obj >= 0){
     color.style.backgroundColor = "Crimson"
     this.state.help.push(topic)
  }
   else
     color.style.backgroundColor = "LightGray"
}

setRecommendation(){

  var feel = document.getElementById("feel")
  var att = document.getElementById("att")
  var area = document.getElementById("area")

if(this.state.score >= 40 && this.state.score <= 50){
    feel.innerHTML= " we think you did very well"
  if(this.state.help.length > 0){
     att.innerHTML =" ,but we suggest you pay more attention to"
     area.innerHTML = "in these area(s)"
  }
  else{
    att.innerHTML =""
    area.innerHTML = "so as to get more comfortable"
  }
}

else if(this.state.score > 25 && this.state.score < 40){
      feel.innerHTML= " we think you did fairly well"

      if(this.state.help.length > 0){
         att.innerHTML =" ,but we suggest you pay more attention to"
         area.innerHTML = "in these area(s)"
      }
      else{
        att.innerHTML =""
        area.innerHTML = "so as to get more comfortable"
      }
}

else {
  feel.innerHTML= " we believe you can do a lot better with a lot more practice"
  if(this.state.help.length > 0){
     att.innerHTML =" ,we suggest that you pay more attention to"
     area.innerHTML = "in these area(s)"
  }
  else{
    att.innerHTML =""
    area.innerHTML = "so as to get more comfortable"
  }
}


}

  render() {

    if(this.state.mode == -2){
    var final_int, final_alg, final_geo, final_mens, final_stats, final_sl

    if(this.state.alg_score != -1)
        this.setPercentages()

    if(this.state.int_score == -2)
         final_int = "ID"
    else
      final_int = this.state.int_score+"%"

    if(this.state.alg_score == -2)
        final_alg = "ID"
    else
       final_alg = this.state.alg_score+"%"

    if(this.state.geo_score == -2)
       final_geo = "ID";
    else
      final_geo = this.state.geo_score+"%"

    if(this.state.mens_score == -2)
        final_mens = "ID"
    else
      final_mens = this.state.mens_score+"%"

    if(this.state.stats_score == -2)
       final_stats = "ID"
    else
       final_stats = this.state.stats_score+"%"

    if(this.state.sl_score == -2)
       final_sl = "ID"
    else
       final_sl = this.state.sl_score+"%"


   return(<div>

     <Header login={this.props.login} name={this.props.name} shown={true}/>

     <div id="analysis-body">

    <div id="analysis-cont-title" className="d-flex justify-content-center">
        <div id="analysis-title" className="d-flex justify-content-center">Analysis</div>
    </div>

     <div id="topic-analysis" className="jumbotron  container shadow-lg">

     {/*title groub 1*/}
     <div id="alg_geo-analysis" className="d-flex justify-content-between">
         <div id>Algebra</div>
         <div>Geometry</div>
     </div>
     {/*title groub 1 end*/}

    {/*card groub 1*/}
     <div id="topic-cards-1" className="d-flex justify-content-center">

     <div id="Algebra" className="progress">
      <div id="alg-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{final_alg}</div>
    </div>

    <div id="Geometry" className="progress">
     <div id="geo-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{final_geo}</div>
   </div>

    </div>
    {/*card groub 1 end*/}

    {/*title groub 2*/}
    <div id="stats_mens-analysis" className="d-flex justify-content-between">
        <div>Statistics</div>
        <div>Mensuration</div>
    </div>
    {/*title groub 2 end*/}

    {/*card groub 2*/}
    <div id="topic-cards-2" className="d-flex justify-content-center">

    <div id="Statistics" className="progress">
    <div id="stat-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{final_stats}</div>
   </div>

   <div id="Mensuration" className="progress">
     <div id="mens-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"  aria-valuemin="0" aria-valuemax="100">{final_mens}</div>
  </div>

   </div>
   {/*card groub 2 end*/}

   {/*title groub 3*/}
   <div id="int_slg-analysis" className="d-flex justify-content-between">
       <div>Integers</div>
       <div>Sets & Logic</div>
   </div>
   {/*title groub 3 end*/}

    {/*card groub 3*/}
   <div id="topic-cards-3" className="d-flex justify-content-center">

   <div id="Integers" className="progress">
     <div id="int-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{final_int}</div>
  </div>

  <div id="slg" className="progress">
    <div id="slg-prog" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{final_sl}</div>
 </div>

  </div>
  {/*card groub 3 end*/}

  <div id="desc-card" className="d-flex justify-content-start">

  <div id="desc1" className="progress">
    <div id="desc-prog1" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">ID</div>
 </div>

 <div id="desc2" className="progress">
   <div id="desc-prog2" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">Poor</div>
</div>

<div id="desc3" className="progress">
  <div id="desc-prog3" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">Fair</div>
</div>

<div id="desc4" className="progress">
  <div id="desc-prog4" className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">Excellent</div>
</div>

</div>

<div id="desc_text-card" className="d-flex justify-content-start">
<div id="desc_text1">(Inadequate Data) Inadequte number of questions attempted</div>
<div id="desc_text2">Poor Performance</div>
<div id="desc_text3">Fair Performance</div>
<div id="desc_text4">Excellent Performance</div>
</div>

{/*<div id="time-card" className="d-flex justify-content-center">

  <div id="time-analysis" className="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated bg-dark" role="progressbar" style={{width:"5%"}} aria-valuemin="0" aria-valuemax="100"></div>
    <div id="t-analysis" className="d-flex justify-content-center">Time Efficiency</div>
 </div>

  </div>*/}


     </div>


     <div id="rec-cont-title" className="d-flex justify-content-center">
         <div id="rec-title" className="d-flex justify-content-center">Recommendation</div>
     </div>

     <div id="rec-text" className="jumbotron container shadow-lg">

     Based on your results,<span id="feel"></span> <span id="att"></span> <span id="tp">{this.state.help.join(",")}</span>. Please visit and practice the questions under <em id="prac">Practice Question Mode</em> to develop your skills <span id="area"></span>. Your report will
     be posted to your <em id="prog">Progress Report</em> if you wish to monitor your progress. Your success is our utmost and paramount goal. Goodluck!

     </div>


     </div>

     <Footer/>

     </div>)
   }

   else if(this.state.mode == 0){
     return(<Mode login={this.props.login} name={this.props.name} mode={this.state.mode}/>)
   }
   else if (this.state.mode == 1) {
     window.location.href="/Matimatiks/report"
   }
  }


}

export default Analysis;
