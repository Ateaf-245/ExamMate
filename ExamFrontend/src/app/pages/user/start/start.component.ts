import { LocationStrategy } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any
  title:any
  questions:any
  currentUserName:any

  marksPerQuestion=0
  marksGot=0
  correctAnswer=0
  attempted=0

  isSubmit=false

  timer:any
  quizTime:any
  timeLeft:any
  

  constructor(private locationSt:LocationStrategy,
              private _activatedRoute:ActivatedRoute,
              private _question:QuestionService,
              private _login:LoginService){

              }

  ngOnInit(): void {
    // this.preventBackButton();
  this.qid = this._activatedRoute.snapshot.params['qid']
    this.loadQuestions()
  
  }

  preventBackButton(){
    history.pushState(null,"" ,location.href)
    this.locationSt.onPopState(()=>{
      history.pushState(null,"",location.href)
    })
  }

  loadQuestions(){
    this._question.viewQuestionsbyQidForTest(this.qid).subscribe(
      (data)=>{
        this.questions=data

        this.quizTime = this.questions.length * 0.5 * 60;
        this.timer= this.quizTime
        
        this.questions.forEach((element:any) => {
          element['givenAnswer']='';
        });
        this.title=this.questions[0].quiz.title
        this.marksPerQuestion=this.questions[0].quiz.maxMarks/this.questions.length
        this.startTimer()
        this.getFormatedTime()
       
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading Questions!", "error")
      }
    )
  }

  submitQuiz(){

    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText:'Submit',
      icon: 'question',
    }).then((e)=>{
      if(e.isConfirmed){
        // calulation
        this.quizResult()
      }
    })

  }

  quizResult(){

    this.isSubmit=true;

    Swal.fire('success','Quiz is submitted succesfully','success')
    
    this.currentUserName = this._login.getUserDetials();

    this._question.evalQuiz(this.questions,this.currentUserName.username).subscribe(
      (data:any)=>{
        console.log(data)

        this.marksGot = data.marksGot;
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;
      },
      (error)=>{
        Swal.fire('error','unable to evaluate the quiz due to server error','error')
      }
    )

    console.log("result",this.marksGot)
  }

  startTimer(){
    let t = window.setInterval(()=>{
      
      //code
      if (this.timer<=0) {
        if (!this.isSubmit) {
          this.quizResult()
          clearInterval(t)
        }
      }else{
        
        this.timer--
        this.timeLeft = (this.timer*100)/this.quizTime
      }
    },1000)
  }

  getFormatedTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer - mm * 60
    return `${mm} min : ${ss} sec`
  }

}
