import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  questionId:any
  qId:any
  qTitle:any

  question:any={
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    image:null,
    quiz:{
      qid:'',
      title:''
    }
  }

  constructor(private _activatedrouter : ActivatedRoute,
              private _router:Router,
              private _snack:MatSnackBar,
              private _question: QuestionService
              ){}

  ngOnInit(): void {
    this.questionId =  this._activatedrouter.snapshot.params['questionid'] 
    
    this._question.getQuestion(this.questionId).subscribe(
      (data) => {
        this.question = data;
        this.qId= this.question.quiz.qid
        this.qTitle= this.question.quiz.title
      },
      (error) => {
        Swal.fire("Error !!", "Unable to fetch the data from server", "error")
      }
    )
    
  }

  formSubmit(){

    if (this.question.content.trim() == "" || this.question.content.trim() == null) {

      this._snack.open("Please enter The content of the question", "close", {
        duration: 3000
      });
      return

    }
    if (this.question.option1.trim() == "" || this.question.option1.trim() == null) {

      this._snack.open("Please enter the first option ", "close", {
        duration: 3000
      });
      return

    }
    if (this.question.option2.trim() == "" || this.question.option2.trim() == null) {

      this._snack.open("Please enter the second option ", "close", {
        duration: 3000
      });
      return

    }
    if (this.question.option3.trim() == "" || this.question.option3.trim() == null) {

      this._snack.open("Please enter the third option ", "close", {
        duration: 3000
      });
      return

    }
    if (this.question.option4.trim() == "" || this.question.option4.trim() == null) {

      this._snack.open("Please enter the forth option ", "close", {
        duration: 3000
      });
      return

    }
    if (this.question.answer == "" || this.question.answer== null) {

      this._snack.open("Please select the correct answer", "close", {
        duration: 3000
      });
      return

    }


    //updating the data
    this._question.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire("Success !!", "Question updated successfully", 'success');
        this._router.navigate([`/admin/questions/`+ this.question.quiz.qid +'/'+ this.question.quiz.title])
      },
      (error) => {
        Swal.fire("Error !!", "Something Went wrong", 'error');
      }
    )
  }


}
