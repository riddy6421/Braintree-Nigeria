import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer';
import './Progress.css';
import $ from 'jquery';
import {onAuth,db} from '../firebase-config.js';
import firebase from 'firebase';
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import waec from './waec-web.png';
import Alert from 'react-bootstrap/Alert'


class Progress extends Component {

  constructor(){
    super();
    this.state = {
      userScore:-1,
      score:null,
      date:null,
      time:null,
      exam:null,
      user:null,
      alg:null,
      alg_t:null,
      int:null,
      int_t:null,
      geo:null,
      geo_t:null,
      s_l:null,
      s_l_t:null,
      mens:null,
      mens_t:null,
      stats:null,
      stats_t:null,
      clicked:null,
      details:null,
      show_alert:null,
      show_invalid:false
    }

    this.createItemList = this.createItemList.bind(this);
    this.InavlidUserPrompt = this.InavlidUserPrompt.bind(this);
    this.createTopicList = this.createTopicList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.cancelAlert = this.cancelAlert.bind(this);
    this.cancelLoad = this.cancelLoad.bind(this);
    this.showLoad = this.showLoad.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentWillMount(){
     var that = this
    this.setState({details:false})
    this.setState({show_alert:false})

    onAuth.onAuthStateChanged(function(user) {

        if (user) {

          that.setState({user:user})
         var userRef = db.collection('users').doc(user.uid);

          var res = [], score = [],exam = [], date=[], time = [], topic = [],
          alg = [], int = [], geo = [], mens = [], s_l = [], stats = [] ,
          alg_t = [], int_t = [], geo_t = [], mens_t = [], s_l_t = [], stats_t = []

      var userScore = 0;

      userRef.get().then(function(doc){

      if(doc.data().score != undefined){
          userScore = Object.getOwnPropertyNames(doc.data().score).length

          for(var i=0; i<userScore/2; i++){
            res.push(doc.data().score["scorestamp"+((Number(i+1)).toString())])
            topic.push(doc.data().score["topicstamp"+((Number(i+1)).toString())])
          }

            if(res.length > 0){
              for(var i=0; i<res.length; i++){
                score.push(res[i].split(" ")[0])
                exam.push(res[i].split(" ")[3])
                date.push(res[i].split(" ")[1])
                time.push(res[i].split(" ")[2])

                alg.push(topic[i][0].split(" ")[2])
                alg_t.push(topic[i][0].split(" ")[1])
                geo.push(topic[i][1].split(" ")[2])
                geo_t.push(topic[i][1].split(" ")[1])
                stats.push(topic[i][2].split(" ")[2])
                stats_t.push(topic[i][2].split(" ")[1])
                s_l.push(topic[i][3].split(" ")[2])
                s_l_t.push(topic[i][3].split(" ")[1])
                mens.push(topic[i][4].split(" ")[2])
                mens_t.push(topic[i][4].split(" ")[1])
                int.push(topic[i][5].split(" ")[2])
                int_t.push(topic[i][5].split(" ")[1])
              }

            }

      }

      else if(doc.data().score == null || doc.data().score == undefined || userScore == 0) {

        score.push(null)
        exam.push(null)
        date.push(null)
        time.push(null)

      }
         that.setState({score:score})
         that.setState({date:date})
         that.setState({time:time})
         that.setState({exam:exam})
         that.setState({userScore:userScore/2})

         that.setState({alg:alg})
         that.setState({alg_t:alg_t})
         that.setState({geo:geo})
         that.setState({geo_t:geo_t})
         that.setState({stats:stats})
         that.setState({stats_t:stats_t})
         that.setState({s_l:s_l})
         that.setState({s_l_t:s_l_t})
         that.setState({mens:mens})
         that.setState({mens_t:mens_t})
         that.setState({int:int})
         that.setState({int_t:int_t})
      })

        } else {
           that.InavlidUserPrompt()
        }
    });
  }

  componentDidUpdate(){
    var that = this

var close = document.getElementById("prog-close")

    if(close != null)
         close.addEventListener("click", function () {window.location.href = "/Matimatiks"})

  }

  componentDidMount(){}

  InavlidUserPrompt(){
    this.setState({show_invalid:true})
    setTimeout(function(){window.location.href="/Matimatiks"},500)
  }


  createTopicList(num){

    var result = [], color = [], topic = [], result_cont = []
    var alg,geo,stats,int,sl,mens

   if(num < this.state.userScore){

     if(this.state.alg != null){
       if(this.state.alg_t != null){

        if(this.state.alg_t[num] < 3){
          alg = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{

          var obj = (this.state.alg[num]/this.state.alg_t[num]) * 100

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          alg = this.state.alg[num]+"%"

        }
        topic.push("Algebra")

        result.push(<div id="prog-alg" style={{backgroundColor: color[0]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{alg}</div>)

        result_cont.push(<ListGroup.Item><div>{topic[0]}<div id="prog-container" className="progress">{result[0]}</div>Attempted : {this.state.alg_t[num]} Score : {this.state.alg[num]} </div></ListGroup.Item>)

        }

     }

     if(this.state.geo != null){
       if(this.state.geo_t != null){

        if(this.state.geo_t[num] < 3){
          geo = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{
          var obj = (this.state.geo[num]/this.state.geo_t[num]) * 100

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          geo = this.state.geo[num]+"%"
        }
        topic.push("Geography")

       result.push(<div id="prog-alg" style={{backgroundColor: color[1]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{geo}</div>)

       result_cont.push(<ListGroup.Item><div>{topic[1]}<div id="prog-container" className="progress">{result[1]}</div>Attempted : {this.state.geo_t[num]} Score : {this.state.geo[num]} </div></ListGroup.Item>)

    }

     }

     if(this.state.stats != null){
       if(this.state.stats_t != null){

        if(this.state.stats_t[num] < 3){
          stats = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{

          var obj = (this.state.stats[num]/this.state.stats_t[num]) * 100

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          stats = this.state.stats[num]+"%"
        }
        topic.push("Statistics")

        result.push(<div id="prog-alg" style={{backgroundColor: color[2]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{stats}</div>)

        result_cont.push(<ListGroup.Item><div>{topic[2]}<div id="prog-container" className="progress">{result[2]}</div>Attempted : {this.state.stats_t[num]} Score : {this.state.stats[num]}</div></ListGroup.Item>)

        }
     }

     if(this.state.s_l != null){
       if(this.state.s_l_t != null){

        if(this.state.s_l_t[num] < 3){
          sl = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{

          var obj = Math.floor((this.state.s_l[num]/this.state.s_l_t[num]) * 100)

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          sl = this.state.s_l[num]+"%"
        }
        topic.push("Sets & Logic")

        result.push(<div id="prog-alg" style={{backgroundColor: color[3]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{sl}</div>)

        result_cont.push(<ListGroup.Item><div>{topic[3]}<div id="prog-container" className="progress">{result[3]}</div>Attempted : {this.state.s_l_t[num]} Score : {this.state.s_l[num]}</div></ListGroup.Item>)
        }
     }

     if(this.state.mens != null){
       if(this.state.mens_t != null){

        if(this.state.mens_t[num] < 3){
          mens = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{

          var obj = Math.floor((this.state.mens[num]/this.state.mens_t[num]) * 100)

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          mens = this.state.mens[num]+"%"
        }
        topic.push("Mensuration")

        result.push(<div id="prog-alg" style={{backgroundColor: color[4]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{mens}</div>)

        result_cont.push(<ListGroup.Item><div>{topic[4]}<div id="prog-container" className="progress">{result[4]}</div>Attempted : {this.state.mens_t[num]} Score : {this.state.mens[num]}</div></ListGroup.Item>)
        }

     }

     if(this.state.int != null){
       if(this.state.int_t != null){

        if(this.state.int_t[num] < 3){
          int = "ID (Inadequte Data)"
          color.push("LightGray")
        }
        else{

          var obj = Math.floor((this.state.int[num]/this.state.int_t[num]) * 100)

          if(obj >= 70 && obj <= 100)
              color.push("LawnGreen")
          else if(obj > 50 && obj < 70)
              color.push("Gold")
          else if(obj <= 50 && obj >= 0)
              color.push("Crimson")

          int = this.state.int[num]+"%"
        }
        topic.push("Integer")

        result.push(<div id="prog-alg" style={{backgroundColor: color[5]}} className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100">{int}</div>)

        result_cont.push(<ListGroup.Item><div>{topic[5]}<div id="prog-container" className="progress">{result[5]}</div>Attempted : {this.state.int_t[num]} Score : {this.state.int[num]}</div></ListGroup.Item>)
        }
     }
 }

    return<ListGroup id="prog-list-details">{result_cont}</ListGroup>
}

deleteList(){
  var that = this

  var confirm = window.confirm("Your entire report would be deleted. Continue?")

  if(confirm == true){
  var userRef = db.collection('users').doc(this.state.user.uid);

  this.showLoad()

if(this.state.userScore > 0){
  userRef.update({
    score: firebase.firestore.FieldValue.delete()
  });

  setTimeout(function(){
     that.setState({userScore:0})
     that.setState({show_alert:true})
     that.cancelLoad()
   },1000)
}

else{alert("Unable to Perform Action : Record Empty")}

setTimeout(function(){
   that.cancelLoad()
 },1000)

}

}

createItemList(score,date,time,exam){
  var image = [], color = [], item = [], newDate;
  var that = this


if(document.getElementById('prog-spin') != null){
    this.showLoad()
}


  setTimeout(function(){
     that.cancelLoad()
   },1000)


if(this.state.userScore > 0){

  for(var i=0; i<this.state.userScore; i++){

    if(score[i] >= 40 && score[i] <= 50){
      color.push("LimeGreen")
    }
      else if(score[i] > 25 && score[i] < 40){
        color.push("Gold")
      }
      else {
        color.push("Crimson")
      }

      if(exam[i] == 1){
        image.push(waec)
      }

      if(date[i] != undefined)
          newDate = date[i].replace(/:/g,"/")

      item.push(<Card id="prog-card">
                        <Accordion.Toggle as={Card.Header} eventKey={i}>
                           <div id="prog-list">
                              <img src={image[i]} width={"60px"} className="mr-3"/>
                              {newDate}<p id="prog-time">{time[i]}</p>
                              <div id="prog-score" style={{color: color[i]}}> {score[i]} / 50</div>
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i}>
                           <Card.Body>{this.createTopicList(i)}</Card.Body>
                        </Accordion.Collapse>
                     </Card>)
  }
  return <Accordion id="prog-accord">{item}</Accordion>
}

else{
  item.push(<p id="empty">Empty Report</p>)
  return <Accordion id="prog-accord">{item}</Accordion>
}
return null
}

showAlert(){
    return  <Alert id="prog-alert" variant="danger"> Report Sucessfully Deleted <div id="prog-canc" onClick={this.cancelAlert}>&times;</div></Alert>
}

cancelAlert(){
  document.getElementById("prog-alert").style.display = "none"
}

cancelLoad(){
  var x = document.getElementById('prog-accord')
  document.getElementById('prog-spin').style.display = "none"
  if(x != null)
      x.style.display = "block"
}

showLoad(){
    var x = document.getElementById('prog-accord')
    if(x != null)
        x.style.display = "none"
  document.getElementById('prog-spin').style.display = "block"
}


refresh(){
  this.createItemList(this.state.score,this.state.date,this.state.time,this.state.exam)
}

   render() {

      // alert(this.state.score+"\n"+this.state.date+"\n"+this.state.exam+"\n"+this.state.time+"\n"+this.state.userScore+"\n"+this.state.details)

    if(this.state.score != null && this.state.date != null && this.state.exam != null && this.state.time != null && this.state.userScore >= 0 && !this.state.details){

  return(
    <div>
<div id="prog-body">

<div id ="prog-modal">
{this.state.userScore == 0 && this.state.show_alert ? this.showAlert() : <div></div>}
<Modal.Dialog id="prog-modal-cont" size="lg">
  <Modal.Header id="prog-hd">

    <Modal.Title>Matimatiks</Modal.Title>

    <div id="prog-bt-li"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">&#9776;</div>
    '<div id="prog-menus" className="dropdown-menu">
       <p id="prog-item1" className="dropdown-item" onClick={this.deleteList}>Clear List</p>
       <p id="prog-item2" className="dropdown-item" onClick={this.refresh}>Refresh</p>
    </div>

  </Modal.Header>
  <Modal.Body id="prog-modal-body">
     <h5 id="prog-bd-title">Progress Report</h5>
     <hr/>
      <div id="prog-spin"><Spinner animation="grow" variant="dark" />Loading...</div>
     {this.createItemList(this.state.score,this.state.date,this.state.time,this.state.exam)}
  </Modal.Body>

  <Modal.Footer>
    <Button id="prog-close" variant="danger">Close</Button>
</Modal.Footer>

</Modal.Dialog>

</div>

</div>
    </div>
  );
}

else{
  return(<div>
      <div>
      <Alert variant="danger" show={this.state.show_invalid}> <div id="invalid-text">Invalid User</div></Alert>
          <div  id="spin" className="mx-auto">
            <div id="blink" className="spinner-grow" role="status">
               <span className="sr-only">Loading...</span>
            </div>
            <div id="ltext">Loading...</div>
            </div>

           </div>
      </div>)

}

}

}

export default Progress;
