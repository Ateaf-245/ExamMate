import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {


  quiz: any = {
    title: "",
    description: "",
    maxMarks: "",
    numberOfQuestions: "",
    active: true,
    category: {
      cid:""
    }
  }

  categories: any = []

  constructor(private _snack: MatSnackBar, 
              private _categoires:CategoryService,
              private _quiz:QuizService) {}

  ngOnInit(): void {

    //load categories
    this._categoires.categories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        Swal.fire("Error !!","Server error","error")
      }
    )
  
  }

  formSubmit() {


    if (this.quiz.title.trim() == "" || this.quiz.title.trim() == null) {

      this._snack.open("Please enter The Title", "close", {
        duration: 3000
      });
      return

    }
    
    if (this.quiz.description.trim() == "" || this.quiz.description.trim() == null) {

      this._snack.open("Please enter Description", "close", {
        duration: 3000
      });
      return

    }

    if (this.quiz.maxMarks.trim() == "" || this.quiz.maxMarks.trim() == null) {

      this._snack.open("Please enter Max marks", "close", {
        duration: 3000
      });
      return

    }

    if (this.quiz.numberOfQuestions.trim()== "" || this.quiz.numberOfQuestions.trim() == null) {

      this._snack.open("Please enter Number Of Questions", "close", {
        duration: 3000
      });
      return

    }

    if (this.quiz.category == "" || this.quiz.category == null) {

      this._snack.open("Please select the Category", "close", {
        duration: 3000
      });
      return
    }

    this._quiz.addQuiz(this.quiz).subscribe(
      (data)=>{
        this.formClear();
        Swal.fire("Success !!","Quiz added successfully",'success');
      },
      (error)=>{
        Swal.fire("Error !!","Something Went wrong",'error');
      }
    )
  
  }

  formClear() {
    this.quiz.title = "";
    this.quiz.description = "";
    this.quiz.maxMarks = "",
    this.quiz.numberOfQuestions = ""
    this.quiz.category.cid = ""
  }

}
