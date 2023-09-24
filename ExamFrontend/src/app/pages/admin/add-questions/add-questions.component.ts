import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from "@angular/router";
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

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
      qid:''
    }
  }

  constructor(private _activatedrouter : ActivatedRoute,
              private _snack:MatSnackBar,
              private _question: QuestionService,
               ){
  }


  ngOnInit(): void {
  this.qId =  this._activatedrouter.snapshot.params['qid']
  this.qTitle = this._activatedrouter.snapshot.params['title']
  this.question.quiz.qid= this.qId
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



    this._question.addQuestion(this.question).subscribe(
      (data)=>{
        this.formClear();
        Swal.fire("Success !!","question is added successfully",'success');
      },
      (error)=>{
        Swal.fire("Error !!","Something Went wrong",'error');
      }
    )

  }

  formClear(){
    this.question.content = ""
    this.question.option1 = ""
    this.question.option2 = ""
    this.question.option3 = ""
    this.question.option4 = ""
    this.question.answer = ""
  }
}
