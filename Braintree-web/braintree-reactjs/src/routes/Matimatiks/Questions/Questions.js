import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Questions.css';
import correct from  './correct.png';
import wrong from  './wrong.png';
import Mode from '../Mode/Mode.js'
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal'
import {storage, auth, db} from '../firebase-config.js';

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

class Questions extends Component {

   constructor() {
    super();
    this.state = {
      storage:null,
      db:null,
      answer:"",
      mode:-1,
      topic:-1,
      visited:null,
      continue:-1,
      answer_map:null,
      unanswered:null,
      start:0,
      Qno:-1,
      random:null
    }
   this.displayQuestion = this.displayQuestion.bind(this);
   this.displayAnswer = this.displayAnswer.bind(this);
   this.nextOperation = this.nextOperation.bind(this);
   this.prevOperation = this.prevOperation.bind(this);
   this.setClickListeners = this.setClickListeners.bind(this);
   this.Response = this.Response.bind(this);
   this.processResponse = this.processResponse.bind(this);
   this.setTimer = this.setTimer.bind(this);
   this.poppulateUnanswered = this.poppulateUnanswered.bind(this);
  }


  componentWillMount(){
   this.setState({storage:storage.ref()})
   this.setState({mode:this.props.mode})
   this.setState({topic:this.props.topic})
   this.setState({random:this.props.rand})
   this.setState({Qno:0})
   this.setState({continue:this.props.continue})
   this.setState({db:db})
   this.setState({answer_map:new Map()})
   this.setState({visited:new Map()})
   this.setState({unanswered:false})
}


componentDidMount(){
  var that = this
  window.scrollTo(0, 20);

  for(var i=0 ; i < this.state.random.length; i++)
       this.state.visited.set(i,false)

  $(window).on('beforeunload', function(){

     return '';
 })

  if(this.state.mode == 0 || this.state.mode == 1){
    this.setClickListeners();

     document.getElementById('Qno').innerHTML = "Q"+(this.state.Qno+1);

     var img = document.getElementById('mode2');

     if(this.state.topic == 1){//Algebra
       document.getElementById("ques-head").innerHTML = "Practice Questions"
       document.getElementById('topic').innerHTML = "Algebra"
       var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"
    }

   //// TODO: insert other topics

 else if(this.state.continue == 1){
   $('#v-answer').replaceWith('<a id="exit">Exit exam session</a>')
   document.getElementById('ques-head').innerHTML = "Mock Exam"
   document.getElementById('topic').innerHTML = "Starting..."
   document.getElementById('topic').style.backgroundColor = "DarkBlue";
   document.getElementById('topic').style.borderColor = "DarkBlue";
   var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"

   this.setTimer(3000) //setTimer

    document.getElementById("exit").addEventListener("click", function () {

       window.location.href="/Matimatiks"

    })

    document.getElementById("done").addEventListener("click", function () {

      document.getElementById('result-modal').style.display = "block"
      that.poppulateUnanswered()

    })

 }
    this.displayQuestion(query,img)

    document.getElementById("nxt").addEventListener("click", function () {
          that.nextOperation()
    })

    document.getElementById("prv").addEventListener("click", function () {
          that.prevOperation()
    })

  }

}


componentDidUpdate(){

}

poppulateUnanswered(){
  var pgh = [], node = []
  var len = this.state.visited.size
  var that = this

  var img = document.getElementById('mode2');

  var element = document.getElementById('result-list')
  var modal = document.getElementById('result-modal')
  var cancel = document.getElementById('result-cancel')



  for(var i=0; i<len; i++){

      if(this.state.visited.get(i) == false){

        var ids = "p "+(i+1)

        pgh.push(document.createElement("li"))
        pgh[i].setAttribute("id",ids)
        pgh[i].setAttribute("style","margin-bottom:10px;")
        node.push(document.createTextNode("Q "+(i+1)))
        pgh[i].appendChild(node[i])
        element.appendChild(pgh[i])

      }

  }

  document.getElementById("result-list").addEventListener("mouseover", function(e) {
            if(e.target && e.target.nodeName == "LI")
              document.getElementById(e.target.id).style.color="#40bcff"
});

document.getElementById("result-list").addEventListener("mouseout", function(e) {
          if(e.target && e.target.nodeName == "LI")
            document.getElementById(e.target.id).style.color="black"
});

document.getElementById("result-list").addEventListener("click", function(e) {
          if(e.target && e.target.nodeName == "LI"){

            var value = e.target.id.split(" ")[1]

             that.setState({Qno:(value-1)})
             that.setState({unanswered:true})

             var img = document.getElementById('mode2');
             var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[that.state.Qno]+".JPG"

             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"

             img.src = null;
             img.style.visibility = "hidden"

               that.displayQuestion(query,img)

             for(var j=0; j<pgh.length; j++){
                  if(document.getElementById("p "+(j+1)) != null)
                      element.removeChild(document.getElementById("p "+(j+1)))
             }


             modal.style.display = "none";

          }

});


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
       for(var j=0; j<pgh.length; j++)
           element.removeChild(document.getElementById("p "+(j+1)))

      modal.style.display = "none";
    }
  }


  cancel.onclick = function() {
     for(var j=0; j<pgh.length; j++)
         element.removeChild(document.getElementById("p "+(j+1)))

    modal.style.display = "none";

  }

}


 displayQuestion(query, img){

   var that = this;
   var nof = that.state.random.length;;
   var click = that.state.click;

   window.scrollTo(0, 20);

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


  if(that.state.start==0){

              setTimeout(function(){
                img.src = url;
                img.style.visibility= "visible"
                $('#mode2').addClass('animated fadeIn');

                    document.getElementById('roller').style.visibility = "hidden"
                    document.getElementById('radio').style.visibility = "visible"
                    document.getElementById('ques-head').style.visibility = "visible"
                    document.getElementById('Qno').style.visibility = "visible"
                    document.getElementById('topic').style.visibility = "visible"

                    document.getElementById('Qno').innerHTML = "Q"+(that.state.Qno+1);


                    if(that.state.mode == 1){
                      document.getElementById('exit').style.visibility = "visible"
                      document.getElementById('done').style.visibility = "visible"

                      if(that.state.unanswered){
                        document.getElementById('ques-spinner').style.display = "none"
                        document.getElementById('load-ques').style.display = "none"
                      }
                    }//Mock Exam Mode


                    /*UI rendering for next and previous buttons*/
                    if(that.state.Qno > 0){
                       document.getElementById('prv').style.visibility = "visible"
                    }
                    else{
                        document.getElementById('prv').style.visibility = "hidden"
                    }

                    if(that.state.Qno < (nof-1))
                        document.getElementById('nxt').style.visibility = "visible";
                    else
                        document.getElementById('nxt').style.visibility = "hidden"

              }, 700);


              setTimeout(function(){
                document.getElementById('ques-spinner').style.display = "none"
                document.getElementById('load-ques').style.display = "none"
              },700)

}

else{

  document.getElementById('Qno').innerHTML = "Q"+(that.state.Qno+1);
  document.getElementById('ques-spinner').style.display = "block"
  document.getElementById('load-ques').style.display = "block"

   setTimeout(function(){

       img.src = url
       img.style.visibility = "visible"

   $('#mode2').addClass('animated fadeIn');

   document.getElementById('ques-spinner').style.display = "none"
   document.getElementById('load-ques').style.display = "none"

    if(that.state.Qno> 0){
       document.getElementById('prv').style.visibility = "visible"
    }
    else{
        document.getElementById('prv').style.visibility = "hidden"
    }

    if(that.state.Qno< (nof-1))
        document.getElementById('nxt').style.visibility = "visible";
    else
        document.getElementById('nxt').style.visibility = "hidden"
},700);


setTimeout(function(){
   document.getElementById('radio').style.visibility = "visible"
    $('#radio').addClass('animated fadeIn');
},800)



}


}).catch(function(error) {
  // Handle any error

});


}

displayAnswer(query, img){

  document.getElementById('Qno').innerHTML = "A"+((this.state.Qno)+1);

  document.getElementById('ques-spinner').style.display = "block"
  document.getElementById('load-ques').style.display = "block"
  document.getElementById('radio').style.visibility = "hidden"
  document.getElementById('prv').style.visibility = "hidden"
  document.getElementById('nxt').style.visibility = "hidden"

  this.state.storage.child(query).getDownloadURL().then(function(url) {

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();


            setTimeout(function(){
            img.style.visibility = "visible"
            img.src = url

            $('#mode2').addClass('animated fadeIn');

            document.getElementById('ques-spinner').style.display = "none"
            document.getElementById('load-ques').style.display = "none"

         },700);


}).catch(function(error) {
 // Handle any error

});

}

  Response(value){
  // Get the modal
  var modal = document.getElementById('bg-modal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

     if(value){
       document.getElementById('ques-value').innerHTML = "Correct"
       document.getElementById('response').src = correct

       if(this.state.mode == 1){
          modal.style.visibility = "hidden"
          this.state.answer_map.set((this.state.Qno+1),value)//set question to the latest answered value in exam mode
       }

     }

    else{
      document.getElementById('ques-value').innerHTML = "Incorrect"
      document.getElementById('response').src = wrong

      if(this.state.mode == 1){
         modal.style.visibility = "hidden"
         this.state.answer_map.set((this.state.Qno+1),value)//set question to the latest answered value in exam mode
      }

    }


     $('#bg-modal').addClass('animated bounceInDown')

// When the user clicks an answer, open the modal
     modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}



/*Next button logic*/
nextOperation(){
  var nof = this.state.random.length;
  var img = document.getElementById('mode2');
  this.state.start++;

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"

if(this.state.Qno < nof){
  this.state.Qno++;

  if(this.state.mode == 0){
    var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"

    if(this.state.visited[this.state.Qno])
       document.getElementById('v-answer').style.visibility = "visible"
   else
      document.getElementById('v-answer').style.visibility = "hidden"
  }

  else if (this.state.mode == 1){
    var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"
  }


  this.displayQuestion(query,img)

}
}

/*previous button logic*/
prevOperation(){
  var nof = this.state.random.length
  var img = document.getElementById('mode2');
  this.state.start++;

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"

  if(this.state.Qno >= 0){

    if(this.state.Qno > 0){
      this.state.Qno--;
    }

   if(this.state.mode == 0){
     var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"

     if(this.state.visited[this.state.Qno])
       document.getElementById('v-answer').style.visibility = "visible"
    else
      document.getElementById('v-answer').style.visibility = "hidden"
}
      else if (this.state.mode == 1){
        var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"
      }

         this.displayQuestion(query,img)
  }
}

setTimer(time){//set timer for exam mode

  var start = 0;

  time *= 1000;

var timer = setInterval(function(){

       var hr = Math.floor(((time / (1000 * 60 * 60)) % 24))

       var min = Math.floor(((time/(1000*60))%60))

       var sec = Math.floor((time/1000) % 60)

       if(hr < 10 )
          hr ="0"+hr

       if(min < 10 )
             min ="0"+min

        if(sec < 10 )
                sec ="0"+sec

     document.getElementById('topic').innerHTML = hr+"h : "+min+"m : "+sec+"s"

     time = time - 1000

    if(start == 0){

      setTimeout(function () {

        clearInterval(timer)

      },time)

    }
    start = 1

   }, 1000);

}

/*answer button logic*/
setClickListeners(){
  var that = this
  document.getElementById("bt1").addEventListener("click", function () {
       that.setState({answer:document.getElementById("bt1").innerHTML})
  })

  document.getElementById("bt2").addEventListener("click", function () {
     that.setState({answer:document.getElementById("bt2").innerHTML})
  })

  document.getElementById("bt3").addEventListener("click", function () {
    that.setState({answer:document.getElementById("bt3").innerHTML})
  })

  document.getElementById("bt4").addEventListener("click", function () {
    that.setState({answer:document.getElementById("bt4").innerHTML})
   })

   document.getElementById("v-answer").addEventListener("click", function () {

      if(document.getElementById("v-answer").innerHTML == "View Answer"){

         var img = document.getElementById('mode2');
         var query = "Waec-Jamb/Solvequestionsmode/Algebra/Answers/A"+that.state.random[that.state.Qno]+".jpg"
         that.displayAnswer(query,img)
         img.src = null;
         img.style.visibility = "hidden"
         document.getElementById("v-answer").innerHTML = "View Question"
      }


      else if(document.getElementById("v-answer").innerHTML == "View Question"){
        var img = document.getElementById('mode2');
        var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+that.state.random[that.state.Qno]+".jpg"
        that.displayQuestion(query,img)
        img.src =  null
        img.style.visibility = "hidden"
        document.getElementById("v-answer").innerHTML = "View Answer"

        document.getElementById('ques-spinner').style.display = "block"
        document.getElementById('load-ques').style.display = "block"
      }

    })

 }



processResponse(){
  this.state.visited.set((this.state.Qno), true)
  var that = this, docRef = null;
  if(this.state.mode == 0 && this.state.topic == 1)//practic Algebra
      docRef = db.collection("Waec_Jamb").doc("Algebra_p");
     // TODO: Implemnt other topics for mode 0
  else if(this.state.mode == 1)
          docRef = db.collection("Waec_Jamb").doc("Exam");

     if(this.state.answer != ""){
       docRef.get().then(function(doc) {
     if (doc.exists) {
       if(that.state.answer == doc.data()["Q"+(that.state.Qno+1)]){
        //  alert("correct")
          that.Response(true)
       }
       else{
        //  alert("wrong")
         that.Response(false)
       }

       if( that.state.mode == 0){

         if(that.state.visited[that.state.Qno])//only show "view answer" button in practice mode
            document.getElementById('v-answer').style.visibility = "visible"
         else
            document.getElementById('v-answer').style.visibility = "hidden"

       }
     } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }
 }).catch(function(error) {
     console.log("Error getting document:", error);
 });


     }

}


  render() {

    if(this.state.mode == 0 || (this.state.mode == 1 && this.state.continue == 1)){

      return(<div>

        <div>
          <Header login={this.props.login} name={this.props.name}/>
        </div>

        <div id="quest-cont" className="jumbotron-fluid">

        <div class="container-fluid q-label d-flex justify-content-between">
          <button id="ques-head" type="button" className="btn"disabled></button>
          <button id="Qno" type="button" className="btn"disabled></button>
          <button id="topic" type="button" className="btn btn-primary"disabled></button>
        </div>

         <div id="roller" class="d-flex justify-content-center">
             <div class="spinner-border" role="status">
             <span class="sr-only">Loading...</span>
         </div>
           <div id="ques-text">Loading...</div>
         </div>


         <div className="d-flex justify-content-center container">

          <div  id="prv" className="triangle-left"></div>

          <div id="ques-spinner" class="spinner-grow" role="status">
              <span class="sr-only">Loading...</span>
          </div>

          <p id ="load-ques">Loading...</p>

          <div id="result-modal">
           <Modal.Dialog id = "result-dialog">
             <Modal.Header id="result-hd">
               <Modal.Title>Matimatiks</Modal.Title>
             </Modal.Header>

             <Modal.Body id="result-body">
              <h4>The following questions have not been attempted. Submit anyway?</h4>
              <hr></hr>
              <ul id="result-list"></ul>

             </Modal.Body>

             <Modal.Footer>
                <button id="result-cancel" type="button" class="btn btn-danger">Cancel</button>
                <button type="button" class="btn btn-success">Yes</button>
            </Modal.Footer>
           </Modal.Dialog>
           </div>

         <div id="bg-modal">
          <Modal.Dialog id="ques-Modal">
            <Modal.Header  id="ques-hd">
              <Modal.Title>Matimatiks</Modal.Title>
            </Modal.Header>

            <Modal.Body id="modal-bd">
              <h1 id="ques-value"></h1>
              <hr></hr>
              <img id="response" className="rounded mx-auto d-block" alt=""/>
            </Modal.Body>
          </Modal.Dialog>
          </div>

          <img id="mode2"  className="rounded mx-auto d-block" alt=""/>

           <div id="nxt" className="triangle-right"></div>

          </div>

         <div className="container-fluid d-flex justify-content-between">

         <button id="v-answer" type="button" class="btn btn-warning">View Answer</button>

        <div id="radio">
          <button id="bt1" type="button" class="btn btn-outline-primary" onClick={this.processResponse}>A</button>
          <button id="bt2" type="button" class="btn btn-outline-secondary" onClick={this.processResponse}>B</button>
          <button id="bt3" type="button" class="btn btn-outline-success" onClick={this.processResponse}>C</button>
          <button id="bt4" type="button" class="btn btn-outline-danger" onClick={this.processResponse}>D</button>
        </div>

        <a id="done">Submit Exam</a>

         </div>

        </div>

        <div>
          <Footer/>
        </div>

        </div>)

    //// TODO: Implemnt other topics
  }



  else
   return(<div></div>)
}

}

export default Questions;
