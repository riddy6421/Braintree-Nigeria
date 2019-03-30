import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Questions.css';
import correct from  './correct.png';
import wrong from  './wrong.png';
import $ from 'jquery';
import firebase, { auth, provider, db} from '../firebase-config.js';


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
  }


  componentWillMount(){
   this.setState({storage:firebase.storage().ref()})
   this.setState({mode:this.props.mode})
   this.setState({topic:this.props.topic})
   this.setState({random:this.props.rand})
   this.setState({Qno:0})
   this.setState({db:firebase.firestore()})
}

 displayQuestion(query, img){
   var that = this;
   var num =  that.state.Qno;
   var nof = that.state.random.length;;
   var click = that.state.click;
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
    // Or inserted into an <img> element:

              setTimeout(function(){
                img.src = url;
                img.style.visibility= "visible"
                $('#mode2').addClass('animated fadeIn');

                    document.getElementById('roller').style.visibility = "hidden"
                    document.getElementById('radio').style.visibility = "visible"
                    document.getElementById('head').style.visibility = "visible"
                    document.getElementById('Qno').style.visibility = "visible"
                    document.getElementById('topic').style.visibility = "visible"

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


              setTimeout(function(){
                document.getElementById('ques-spinner').style.display = "none"
                document.getElementById('load-ques').style.display = "none"
              },2000)


}

else{
  document.getElementById('Qno').innerHTML = "Q"+(num+1);
  document.getElementById('ques-spinner').style.display = "block"
  document.getElementById('load-ques').style.display = "block"

   setTimeout(function(){
   img.style.visibility = "visible"
   img.src = url

   $('#mode2').addClass('animated fadeIn');

   document.getElementById('ques-spinner').style.display = "none"
   document.getElementById('load-ques').style.display = "none"

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
},700);


setTimeout(function(){
   document.getElementById('radio').style.visibility = "visible"
    $('#radio').addClass('animated fadeIn');
},800)



}

window.scrollTo(0, 0);

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
window.scrollTo(0, 100);
}

  Response(value){
  // Get the modal
  var modal = document.getElementById('ques-Modal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];


     if(value){
       document.getElementById('ques-value').innerHTML = "Correct"
       document.getElementById('response').src = correct
     }

    else{
      document.getElementById('ques-value').innerHTML = "Wrong"
      document.getElementById('response').src = wrong
    }

     $('#ques-Modal').addClass('animated bounceInDown')

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
  var num =  this.state.Qno;
  var nof = this.state.random.length;
  var img = document.getElementById('mode2');
  this.state.start++;

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"



if(num < nof){
  this.state.Qno++;
  var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[num]+".jpg"
  this.displayQuestion(query,img)

  if(this.state.visited[this.state.Qno])
     document.getElementById('v-answer').style.visibility = "visible"
 else
    document.getElementById('v-answer').style.visibility = "hidden"
}
}

/*previous button logic*/
prevOperation(){
  var num =  this.state.Qno;
  var nof = this.state.random.length
  var img = document.getElementById('mode2');
  this.state.start++;

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"



  if(num >= 0){
    if(num > 0){
      this.state.Qno--;
    }
    var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[num]+".jpg"
    this.displayQuestion(query,img)

    if(this.state.visited[this.state.Qno])
       document.getElementById('v-answer').style.visibility = "visible"
   else
      document.getElementById('v-answer').style.visibility = "hidden"
  }
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

 componentDidUpdate(){

   if(this.state.visited != null){
      var len = this.state.visited.length

      for(var i = 0; i<len; i++)
          this.state.visited[i] = false

   }

}

 componentDidMount(){
   this.setClickListeners();
   this.setState({visited:new Array(this.state.random.length)})
   if(this.state.mode == 0 && this.state.topic == 1){
      document.getElementById('Qno').innerHTML = "Q"+(this.state.Qno+1);

      document.getElementById('topic').innerHTML = "Algebra"

     var img = document.getElementById('mode2');

     var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[0]+".jpg"

     this.displayQuestion(query,img)

     var that = this

     document.getElementById("nxt").addEventListener("click", function () {
           that.nextOperation()
     })

     document.getElementById("prv").addEventListener("click", function () {
           that.prevOperation()
     })

   }

 }

processResponse(){
  this.state.visited[this.state.Qno] = true
  var that = this;
  if(this.state.mode == 0 && this.state.topic == 1){//practic Algebra
     var docRef = db.collection("Waec_Jamb").doc("Algebra_p");
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
       if(that.state.visited[that.state.Qno])
          document.getElementById('v-answer').style.visibility = "visible"
      else
         document.getElementById('v-answer').style.visibility = "hidden"
     } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }
 }).catch(function(error) {
     console.log("Error getting document:", error);
 });


     }
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
          <button id="head" type="button" class="btn "disabled>Practice Questions</button>
          <button id="Qno" type="button" class="btn"disabled></button>
          <button id="topic" type="button" class="btn btn-primary "disabled></button>
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


          <div id="ques-Modal" class="modal">
            <div class="ques-modal-content">
              <div class="ques-modal-header">
              <h2 id="ques-value"></h2>
              </div>
              <div class="ques-modal-body">
                  <img id="response"  className="rounded mx-auto d-block" alt=""/>
              </div>
            </div>
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

        <button id="dummy" type="button" class="btn btn-warning">Warning</button>

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
