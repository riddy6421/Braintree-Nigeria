import React, { Component } from 'react';
import Header from '../header/Header-Mat';
import Footer from '../../Footer/Footer'
import './Questions.css';
import Result from '../Result/Result.js'
import Analysis from '../Analysis/Analysis.js'
import correct from  './correct.png';
import wrong from  './wrong.png';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal'
import {storage,db} from '../firebase-config.js';

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
      analysis:null,
      answer_map:null,
      unanswered:null,
      response_valueMap:null,
      done:null,
      start:0,
      time:0,
      timer:null,
      time_allotted:0,
      Qno:-1,
      review:null,
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
   this.computeResult = this.computeResult.bind(this);
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
   this.setState({done:false})
   this.setState({analysis:false})
   this.setState({time_allotted:3000})

   if(this.props.review == undefined)
        this.setState({review:false})
   else
     this.setState({review:this.props.review})

   this.setState({response_valueMap:this.props.response})
}


componentDidMount(){
  var that = this
  window.scrollTo(0, 20);

  document.getElementById('mat-hd').style.position = "absolute"

// eslint-disable-next-line
  if(this.state.response_valueMap == undefined && !this.state.review)
        this.setState({response_valueMap:new Map()})
  else if(this.state.response_valueMap == undefined && this.state.review)
         this.setState({response_valueMap:this.state.response})


  for(var i=0 ; i < this.state.random.length; i++){
      if(!this.state.review)
          this.state.visited.set((i+1),false)
  }

   // if(!this.state.review){
   //   window.onbeforeunload = function(e) {
   //      return 'Dialog text here.';
   //   };
   // }


// eslint-disable-next-line
  if(this.state.mode == 0 || this.state.mode == 1){
    this.setClickListeners();

//  document.getElementById('Qno').innerHTML = "Q"+(this.state.Qno+1);

     var img = document.getElementById('mode2');
// eslint-disable-next-line
  if(this.state.mode == 0){
      document.getElementById('done').innerHTML = "Exit Session";
      document.getElementById('v-answer').innerHTML = "View Answer";

      document.getElementById("done").addEventListener("click", function () {window.location.reload()})
     if(this.state.topic == 1){//Algebra
       document.getElementById("ques-head").innerHTML = "Practice Q."
       document.getElementById('topic').innerHTML = "Algebra"
       var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"
    }

     // TODO: insert other topics
  }



// eslint-disable-next-line
 else if(this.state.continue == 1){//Exam mode
   document.getElementById('ques-head').innerHTML = "Mock Exam"

   document.getElementById('topic').style.backgroundColor = "DarkBlue";
   document.getElementById('topic').style.borderColor = "DarkBlue";

 // eslint-disable-next-line
   var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"


   /* review buttons start*/
          document.getElementById('rev-bt1').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt1').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt2').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt2').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt3').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt3').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt4').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt4').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)

           })

          document.getElementById('rev-bt5').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt5').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt6').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt6').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt7').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt7').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt8').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt8').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt9').addEventListener("click", function () {
             var img = document.getElementById('mode2');
             var num = (Number(document.getElementById('rev-bt9').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          document.getElementById('rev-bt10').addEventListener("click", function () {
              var img = document.getElementById('mode2');
              var num = (Number(document.getElementById('rev-bt10').innerHTML))-1
             that.setState({Qno:num})
             var query ="Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[num]+".JPG"
             img.src = null;
             img.style.visibility = "hidden"
             document.getElementById('ques-spinner').style.display = "block"
             document.getElementById('load-ques').style.display = "block"
             that.displayQuestion(query,img)
          })

          /*review buttons end*/
         document.getElementById('rev-prv').style.backgroundColor = "DarkBlue"
         document.getElementById('rev-prv').style.borderColor = "DarkBlue"
         document.getElementById('rev-prv').addEventListener("click", function () {

           var last = document.getElementById('rev-bt10').innerHTML
           var first = document.getElementById('rev-bt1').innerHTML

           for(var i=1; i<=10; i++)
             document.getElementById('rev-bt'+i).innerHTML -=10


             if(first == 11)
                document.getElementById('rev-prv').style.visibility = "hidden"

                document.getElementById('rev-nxt').style.visibility = "visible"


         })

         document.getElementById('rev-nxt').style.backgroundColor = "DarkBlue"
         document.getElementById('rev-nxt').style.borderColor = "DarkBlue"
         document.getElementById('rev-nxt').addEventListener("click", function () {

           var last = document.getElementById('rev-bt10').innerHTML
           var first = document.getElementById('rev-bt1').innerHTML

           for(var i=1; i<=10; i++)
            document.getElementById('rev-bt'+i).innerHTML = Number(last)+i

            if(last == 40)
               document.getElementById('rev-nxt').style.visibility = "hidden"

               document.getElementById('rev-prv').style.visibility = "visible"

         })

          document.getElementById('rev-prv').style.visibility = "hidden"

   if(!this.state.review){
     document.getElementById("v-answer").style.backgroundColor="Crimson"
     document.getElementById("v-answer").style.borderColor="Crimson"


     document.getElementById('topic').innerHTML = "Starting..."
     this.setTimer(this.state.time_allotted) //setTimer

   document.getElementById("done").addEventListener("click", function () {

     document.getElementById('result-modal').style.display = "block"
         that.computeResult()
   })

   }

   else{

     document.getElementById('ques-head').style.visibility = "hidden"
     document.getElementById('ques-spinner').style.marginTop = "3%"
     document.getElementById('load-ques').style.marginTop = "5%"
     document.getElementById("done").style.visibility = "hidden"


     document.getElementById("done").addEventListener("click", function () {

         window.location.reload();

     })

       var topic =  document.getElementById("topic")
       topic.disabled = false

       topic.innerHTML = "Result Analysis and Recommendation"
       topic.style.fontSize = "15px"
       topic.addEventListener("click",function () {
         that.setState({analysis:true})
       })

   }

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
// eslint-disable-next-line
if(!this.state.review && this.state.answer == "")
   for(var i=0 ;i<this.state.random.length; i++)
       this.state.response_valueMap.set((i+1),"")
}

computeResult(){
  var pgh = [], node = []
  var len = this.state.visited.size
  var that = this

  var element = document.getElementById('result-list')
  var modal = document.getElementById('result-modal')
  var cancel = document.getElementById('result-cancel')
  var done  =  document.getElementById('result-done')
  var attempted = 0;



  for(var i=0; i<len; i++){
    // eslint-disable-next-line
      if(!this.state.visited.get(i+1)){
        document.getElementById('result-desc').innerHTML = "The following questions have not been attempted. Submit anyway?"
        var ids = "p "+(i+1)
        pgh.push(document.createElement("li"))
        pgh[(pgh.length-1)].setAttribute("id",ids)
        node.push(document.createTextNode("Q "+(i+1)))
        pgh[(pgh.length-1)].appendChild(node[(node.length-1)])
        element.appendChild(pgh[(pgh.length-1)])
      }

      else{
           attempted++
           // eslint-disable-next-line
           if(attempted == 50){
              document.getElementById('result-desc').innerHTML = "You're attempting to submit this exam. Continue?"
           }
      }

  }


  if(attempted < 50){

  document.getElementById("result-list").addEventListener("mouseover", function(e) {
    // eslint-disable-next-line
            if(e.target && e.target.nodeName == "LI")
              document.getElementById(e.target.id).style.color="#40bcff"
});

document.getElementById("result-list").addEventListener("mouseout", function(e) {
  // eslint-disable-next-line
          if(e.target && e.target.nodeName == "LI")
            document.getElementById(e.target.id).style.color="black"
});

document.getElementById("result-list").addEventListener("click", function(e) {
  // eslint-disable-next-line
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

}

done.onclick = function(event){
   that.setState({done:true})
}

var x = that.state.visited.size

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    // eslint-disable-next-line
    if (event.target == modal) {
       for(var j=0; j<x; j++){
           if(!that.state.visited.get(j+1)){
             element.removeChild(document.getElementById("p "+(j+1)))
           }
        }

      modal.style.display = "none";
    }
  }


  cancel.onclick = function() {
     for(var j=0; j<x; j++){
        if(!that.state.visited.get(j+1)){
          element.removeChild(document.getElementById("p "+(j+1)))
        }
      }
    modal.style.display = "none";
  }
}


 displayQuestion(query, img){

   var that = this;
   var nof = that.state.random.length;;

   window.scrollTo(0, 20);

   this.state.storage.child(query).getDownloadURL().then(function(url) {
   // `url` is the download URL for 'images/stars.jpg'
             // This can be downloaded directly:
             var xhr = new XMLHttpRequest();
             xhr.responseType = 'blob';
             xhr.onload = function(event) {
               // eslint-disable-next-line
               var blob = xhr.response;
             };

             xhr.open('GET', url);
             xhr.send();

// eslint-disable-next-line
  if(that.state.start==0){

              setTimeout(function(){
                img.src = url;
                img.style.visibility= "visible"
                $('#mode2').addClass('animated fadeIn');

                if(that.state.mode == 1){
                  document.getElementById('rev-list').style.display = "block"
                  document.getElementById('rev-list').style.visibility = "visible"

                  if(that.state.review){
                    document.getElementById("done").style.visibility = "visible"
                    document.getElementById("done").style.color = "crimson"
                    document.getElementById("done").innerHTML = "Exit Session"

                        setTimeout(function(){

                            img.src = url
                            img.style.visibility = "visible"
                            $('#mode2').addClass('animated fadeIn');

                              document.getElementById('ques-spinner').style.display = "none"
                            document.getElementById('load-ques').style.display = "none"

                    },700);

                      if(that.state.response_valueMap.get(that.state.Qno+1) != undefined){
                          for(var i=1; i<=4; i++){
                              document.getElementById('bt'+i).disabled = true
                              document.getElementById('bt'+i).style.backgroundColor = "white"
                                // eslint-disable-next-line
                            if(document.getElementById('bt'+i).innerHTML == that.state.response_valueMap.get(that.state.Qno+1)){
                                  document.getElementById('bt'+i).style.backgroundColor = "LightGray"
                                }

                          }

                        }
                     that.processResponse()
                     document.getElementById('v-answer').style.visibility = "visible"
                     document.getElementById("v-answer").innerHTML = "View Answer"
                     document.getElementById("v-answer").style.backgroundColor="DarkOrange"
                     document.getElementById("v-answer").style.borderColor="DarkOrange"
                  }

                  else if(!that.state.review){
                    document.getElementById("v-answer").style.visibility="visible"
                      document.getElementById('done').style.visibility = "visible"
                  }


                  if(that.state.unanswered){
                    document.getElementById('ques-spinner').style.display = "none"
                    document.getElementById('load-ques').style.display = "none"
                  }

                }//Mock Exam Mode

                else if(that.state.mode == 0){
                  document.getElementById('done').style.visibility = "visible"
                  document.getElementById('done').style.color = "Crimson"
                }


                    document.getElementById('roller').style.visibility = "hidden"
                    document.getElementById('radio').style.visibility = "visible"
                    document.getElementById('ques-head').style.display = "block"
                    document.getElementById('Qno').style.display= "block"
                    document.getElementById('topic').style.display = "block"


                  document.getElementById('Qno').innerHTML = "Q"+(that.state.Qno+1);

// eslint-disable-next-line

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

   if(that.state.review){
     // eslint-disable-next-line
      if(that.state.response_valueMap.get(that.state.Qno+1) != undefined){
        for(var i=1; i<=4; i++){
            document.getElementById('bt'+i).disabled = true
            // eslint-disable-next-line
            if(document.getElementById('bt'+i).innerHTML == that.state.response_valueMap.get(that.state.Qno+1))
                document.getElementById('bt'+i).style.backgroundColor = "LightGray"
        }
       }
           that.processResponse()
   }

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
  var that = this
  var modal = document.getElementById('bg-modal');

     if(value){
       document.getElementById('ques-value').innerHTML = "Correct"
       document.getElementById('response').src = correct

// eslint-disable-next-line
       if(this.state.mode == 1){
           if(!this.state.review){
             modal.style.visibility = "hidden"
             this.state.answer_map.set((this.state.Qno+1),value)//set question to the latest answered value in exam mode
           }

           else
             modal.style.visibility = "block"
       }
     }

    else{
      document.getElementById('ques-value').innerHTML = "Incorrect"
      document.getElementById('response').src = wrong

// eslint-disable-next-line
      if(this.state.mode == 1){
        if(!this.state.review){
          modal.style.visibility = "hidden"
          this.state.answer_map.set((this.state.Qno+1),value)//set question to the latest answered value in exam mode
        }
            else
              modal.style.visibility = "block"
      }
    }

     $('#bg-modal').addClass('animated fadeIn')

// When the user clicks an answer, open the modal
     modal.style.display = "block";

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    // eslint-disable-next-line
    if (event.target == modal) {
      modal.style.display = "none";

if(that.state.review){
      for(var i=1; i<=4; i++){
          // eslint-disable-next-line
          if(document.getElementById('bt'+i).innerHTML == that.state.response_valueMap.get(that.state.Qno+1)){
            if(that.props.answers.get(that.state.Qno+1))
                document.getElementById('bt'+i).style.backgroundColor = "LimeGreen"
            else
               document.getElementById('bt'+i).style.backgroundColor = "Red"
          }
      }
    }
    }
  }
}



/*Next button logic*/
nextOperation(){
  var nof = this.state.random.length;
  var img = document.getElementById('mode2');
  this.setState({start:(this.state.start+1)})

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"

  document.getElementById("nxt").style.visibility = "hidden"


if(this.state.Qno < nof){
  this.setState({Qno:(this.state.Qno+1)})
// eslint-disable-next-line
  if(this.state.mode == 0){
    var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"

    if(this.state.visited[this.state.Qno])
       document.getElementById('v-answer').style.visibility = "visible"
   else
      document.getElementById('v-answer').style.visibility = "hidden"
  }
// eslint-disable-next-line
  else if (this.state.mode == 1){
    // eslint-disable-next-line
    var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"
  }

  this.displayQuestion(query,img)
}

  for(var i=1; i<=4; i++){
    document.getElementById('bt'+i).style.backgroundColor = "white"
    if(this.state.mode == 0)
      document.getElementById('bt'+i).style.backgroundColor = "white"
    else if(this.state.mode == 1){
      if(this.state.visited.get(this.state.Qno+1)){
           if(this.state.response_valueMap.get(this.state.Qno+1) == document.getElementById('bt'+i).innerHTML)
              document.getElementById('bt'+i).style.backgroundColor = "LightGray"
      }
      else {
           document.getElementById('bt'+i).style.backgroundColor = "white"
      }
    }
  }

}

/*previous button logic*/
prevOperation(){
  var img = document.getElementById('mode2');
  this.setState({start:(this.state.start+1)})

  img.src = null;
  img.style.visibility = "hidden"
  document.getElementById('radio').style.visibility = "hidden"

  document.getElementById("prv").style.visibility = "hidden"

  if(this.state.Qno >= 0){
    if(this.state.Qno > 0)
    this.setState({Qno:(this.state.Qno-1)})
// eslint-disable-next-line
   if(this.state.mode == 0){
     var query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+this.state.random[this.state.Qno]+".jpg"

     if(this.state.visited[this.state.Qno])
       document.getElementById('v-answer').style.visibility = "visible"
    else
      document.getElementById('v-answer').style.visibility = "hidden"
}
// eslint-disable-next-line
      else if (this.state.mode == 1){
        // eslint-disable-next-line
        var query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+this.state.random[this.state.Qno]+".JPG"
      }

         this.displayQuestion(query,img)
  }

    for(var i=1; i<=4; i++){
      document.getElementById('bt'+i).style.backgroundColor = "white"

      if(this.state.mode == 0)
        document.getElementById('bt'+i).style.backgroundColor = "white"

      else if(this.state.mode == 1){
        if(this.state.visited.get(this.state.Qno+1)){
             if(this.state.response_valueMap.get(this.state.Qno+1) == document.getElementById('bt'+i).innerHTML)
                document.getElementById('bt'+i).style.backgroundColor = "LightGray"
        }
        else {
             document.getElementById('bt'+i).style.backgroundColor = "white"
        }
      }
    }

}

setTimer(time){//set timer for exam mode

  var that = this

  var start = 0, rushHour = 0;

  time *= 1000;

  this.setState({timer:setInterval(function(){

        var hr = Math.floor(((time / (1000 * 60 * 60)) % 24))

        var min = Math.floor(((time/(1000*60))%60))

        var sec = Math.floor((time/1000) % 60)

        if(hr < 10 )
           hr ="0"+hr

        if(min < 10 ){
             min ="0"+min
             // eslint-disable-next-line
             if(min <= 5 && rushHour == 0){
               document.getElementById('topic').style.backgroundColor = "red"
               document.getElementById('topic').style.borderColor = "red"
               rushHour = 1
             }

        }

         if(sec < 10 )
                 sec ="0"+sec

      that.setState({time:time})

     document.getElementById('topic').innerHTML = hr+"h : "+min+"m : "+sec+"s"
// eslint-disable-next-line
     if(start == 0){

       setTimeout(function () {

         clearInterval(that.state.timer)

          if(!that.state.done){ //If exam has not been finished
              $('#done-modal').addClass('animated bounceInDown')
                document.getElementById("done-modal").style.display = "block"

                document.getElementById("done-btn").addEventListener("click", function () {

                  document.getElementById("done-modal").style.display = "none"

                  that.setState({done:true})

                })

              }

       },time)

     }

     time = time - 1000
     start = 1

    }, 1000)

  })

}

/*answer button logic*/
setClickListeners(){
  var that = this
  document.getElementById("bt1").addEventListener("click", function () {
    document.getElementById("bt1").style.backgroundColor = "LightGray"
    document.getElementById("bt2").style.backgroundColor = "white"
    document.getElementById("bt3").style.backgroundColor = "white"
    document.getElementById("bt4").style.backgroundColor = "white"

    that.setState({answer:document.getElementById("bt1").innerHTML})
  })

  document.getElementById("bt2").addEventListener("click", function () {
    document.getElementById("bt2").style.backgroundColor = "LightGray"
    document.getElementById("bt1").style.backgroundColor = "white"
    document.getElementById("bt3").style.backgroundColor = "white"
    document.getElementById("bt4").style.backgroundColor = "white"


    that.setState({answer:document.getElementById("bt2").innerHTML})
  })

  document.getElementById("bt3").addEventListener("click", function () {
    document.getElementById("bt3").style.backgroundColor = "LightGray"
    document.getElementById("bt2").style.backgroundColor = "white"
    document.getElementById("bt1").style.backgroundColor = "white"
    document.getElementById("bt4").style.backgroundColor = "white"


    that.setState({answer:document.getElementById("bt3").innerHTML})
  })

  document.getElementById("bt4").addEventListener("click", function () {
    document.getElementById("bt4").style.backgroundColor = "LightGray"
    document.getElementById("bt2").style.backgroundColor = "white"
    document.getElementById("bt3").style.backgroundColor = "white"
    document.getElementById("bt1").style.backgroundColor = "white"

    that.setState({answer:document.getElementById("bt4").innerHTML})

   })

   var img = document.getElementById('mode2');

   document.getElementById("v-answer").addEventListener("click", function () {
// eslint-disable-next-line
      if(document.getElementById("v-answer").innerHTML == "View Answer"){

        if(that.state.mode == 0 && that.state.topic == 1)
          var query = "Waec-Jamb/Solvequestionsmode/Algebra/Answers/A"+that.state.random[that.state.Qno]+".jpg"
        else if(that.state.mode == 1){
          document.getElementById("rev-list").style.visibility = "hidden"
            var query = "Waec-Jamb/Takemockexammode/WAEC/Answers/A"+that.state.random[that.state.Qno]+".JPG"
        }

         that.displayAnswer(query,img)
         img.src = null;
         img.style.visibility = "hidden"
         document.getElementById("v-answer").innerHTML = "View Question"
      }

      // eslint-disable-next-line
      else if(document.getElementById("v-answer").innerHTML == "View Question"){
        var query;

        // eslint-disable-next-line
        if(that.state.mode == 0 && that.state.topic == 1)
          query = "Waec-Jamb/Solvequestionsmode/Algebra/Questions/Q"+that.state.random[that.state.Qno]+".jpg"
        else if(that.state.mode == 1){
          document.getElementById("rev-list").style.visibility = "visible"
          query = "Waec-Jamb/Takemockexammode/WAEC/Questions/Q"+that.state.random[that.state.Qno]+".JPG"
        }

        that.displayQuestion(query,img)
        img.src =  null
        img.style.visibility = "hidden"
        document.getElementById("v-answer").innerHTML = "View Answer"
        document.getElementById('ques-spinner').style.display = "block"
        document.getElementById('load-ques').style.display = "block"
      }

      else if(document.getElementById("v-answer").innerHTML.includes("Exit")){window.location.reload()}
    })

 }



processResponse(){
  if(!this.state.review)
      this.state.visited.set((this.state.Qno+1), true)

  var that = this, docRef = null;
  // eslint-disable-next-line
  if(this.state.mode == 0 && this.state.topic == 1)//practic Algebra
      docRef = db.collection("Waec_Jamb").doc("Algebra_p");
     // TODO: Implement other topics for mode 0
     // eslint-disable-next-line
  else if(this.state.mode == 1)
          docRef = db.collection("Waec_Jamb").doc("Exam");
// eslint-disable-next-line

if(!that.state.review){
       if(this.state.answer != ""){
       docRef.get().then(function(doc) {
         that.state.response_valueMap.set((that.state.Qno+1),that.state.answer)
     if (doc.exists) {
       // eslint-disable-next-line
       if(that.state.answer == doc.data()["Q"+that.state.random[that.state.Qno]])
           that.Response(true)
       else
         that.Response(false)

     } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }
 }).catch(function(error) {
     console.log("Error getting document:", error);
 });

}
}

else if(that.state.review){
       docRef.get().then(function(doc) {
     if (doc.exists) {
       // eslint-disable-next-line
       if(that.props.answers.get(that.state.Qno+1))
          that.Response(true)
       else
         that.Response(false)

     } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }
 }).catch(function(error) {
     console.log("Error getting document:", error);
 });

}

// eslint-disable-next-line
if(that.state.mode == 0){

  if(that.state.visited.get(that.state.Qno+1)){
     document.getElementById('v-answer').style.visibility = "visible"
     document.getElementById('v-answer').style.backgroundColor = "DarkOrange"
     document.getElementById('v-answer').style.borderColor = "DarkOrange"
  }

  else
     document.getElementById('v-answer').style.visibility = "hidden"

}

}

  render() {
     // eslint-disable-next-line
    if(this.state.mode == 0 || (this.state.mode == 1 && this.state.continue == 1 && !this.state.done && !this.state.analysis)){

      return(<div>

        <div>
          <Header login={this.props.login} name={this.props.name} shown={true} mode={this.state.mode}/>
        </div>

        <div id="quest-cont" className="jumbotron-fluid">

        <div id="rev-cont"  class="d-flex justify-content-between">
          <button id="ques-head" type="button" className="btn"disabled></button>

        <nav id="rev-list" aria-label="Page navigation example">
                    <ul class="pagination">
                    <li class="page-item">
                    <button id="rev-prv" type="button" className="btn btn-primary">
                    <span aria-hidden="true">&laquo;</span>
                    </button>
                    </li>

                    <li class="page-item"><button id="rev-bt1" type="button" className="btn btn-light">1</button></li>
                    <li class="page-item"><button id="rev-bt2" type="button" className="btn btn-light">2</button></li>
                    <li class="page-item"><button id="rev-bt3" type="button" className="btn btn-light">3</button></li>
                    <li class="page-item"><button id="rev-bt4" type="button" className="btn btn-light">4</button></li>
                    <li class="page-item"><button id="rev-bt5" type="button" className="btn btn-light">5</button></li>
                    <li class="page-item"><button id="rev-bt6" type="button" className="btn btn-light">6</button></li>
                    <li class="page-item"><button id="rev-bt7" type="button" className="btn btn-light">7</button></li>
                    <li class="page-item"><button id="rev-bt8" type="button" className="btn btn-light">8</button></li>
                    <li class="page-item"><button id="rev-bt9" type="button" className="btn btn-light">9</button></li>
                    <li class="page-item"><button id="rev-bt10" type="button" className="btn btn-light">10</button></li>

                    <li class="page-item">
                    <button id="rev-nxt" type="button" className="btn btn-primary">
                    <span aria-hidden="true">&raquo;</span>
                    </button>
                    </li>
                    </ul>
        </nav>
        <button id="topic" type="button" className="btn btn-primary"disabled></button>
        {/*<button id="ra" type="button" className="btn btn-primary">Result Analysis and Recommendation</button>*/}
        </div>

        <div id="ques-title" class="container-fluid d-flex justify-content-center">
          <button id="Qno" type="button" className="btn"disabled></button>

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
           <Modal.Dialog id="result-dialog">
             <Modal.Header id="result-hd">
               <Modal.Title>Matimatiks</Modal.Title>
             </Modal.Header>

             <Modal.Body id="results-body">
              <h4 id="result-desc">?</h4>
              <hr></hr>
              <ul id="result-list"></ul>
             </Modal.Body>

             <Modal.Footer>
                <button id="result-cancel" type="button" class="btn btn-danger">Cancel</button>
                <button id="result-done" type="button" class="btn btn-success">Yes</button>
            </Modal.Footer>
           </Modal.Dialog>
           </div>

         <div id="bg-modal">
          <Modal.Dialog id="ques-Modal">
            <Modal.Header  id="ques-hd">
              <Modal.Title>Matimatiks</Modal.Title>
            </Modal.Header>

            <Modal.Body id="modal-bd">
              <h1 id="ques-value">?</h1>
              <hr></hr>
              <img id="response" className="rounded mx-auto d-block" alt=""/>
            </Modal.Body>
          </Modal.Dialog>
          </div>

          <div id="done-modal">
           <Modal.Dialog id="done-Modal">
             <Modal.Header  id="done-hd">
               <Modal.Title>Matimatiks</Modal.Title>
             </Modal.Header>

             <Modal.Body id="done-bd">
              <p id="done-text">Time expired. Click continue to view result.</p>
             </Modal.Body>
             <Modal.Footer>
                <button id="done-btn" type="button" class="btn btn-success">Continue</button>
            </Modal.Footer>
           </Modal.Dialog>
           </div>

          <img id="mode2"  className="rounded mx-auto d-block" alt=""/>

           <div id="nxt" className="triangle-right"></div>

          </div>

         <div className="container-fluid d-flex justify-content-between">

         <button id="v-answer" type="button" class="btn">Exit Session <i class="close">&times;</i></button>

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
     if(this.state.done){//Time has expired or exam submitted. go to results page
      clearInterval(this.state.timer)
      return(<Result login={this.props.login} name={this.props.name} answers={this.state.answer_map} time={this.state.time}
         allowedTime={this.state.time_allotted} mode={this.state.mode}  random={this.props.rand} continue={this.state.continue}
         response={this.state.response_valueMap} exam={this.props.exam} visited={this.state.visited} review={this.state.review}/>)
    }

       if(this.state.analysis){//Result analysis was clicked from Question
         var score = 0;
         for(var i=0; i<this.props.rand.size; i++){
              if(this.state.answer_map.get(i+1)){
                 score++
              }
         }
             return(<Analysis login={this.props.login} name={this.props.name} random={this.props.rand} answers={this.state.answer_map} visited={this.state.visited} score={score}/>)
       }

  else
   return(<div></div>)
}

}

export default Questions;
