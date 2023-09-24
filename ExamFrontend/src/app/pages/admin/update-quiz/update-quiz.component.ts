import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category/category.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  quiz: any = {
    title: "",
    description: "",
    maxMarks: "",
    numberOfQuestions: "",
    active: true,
    category: {
      cid: ""
    }
  }

  categories: any = []

  quizId: any;

  constructor(private _quiz: QuizService,
    private _snack: MatSnackBar,
    private _categoires: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    //load the data based on the quizId
    this.quizId = this._activatedRoute.snapshot.params['qid']

    //load categories
    this._categoires.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire("Error !!", "Server error", "error")
      }
    )
    //get the date of single quiz based on quizid
    this._quiz.getQuizById(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire("Error !!", "Unable to fetch the data from server", "error")
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

    if (this.quiz.numberOfQuestions.trim() == "" || this.quiz.numberOfQuestions.trim() == null) {

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

    //updating the data
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire("Success !!", "Quiz updated successfully", 'success');
        this._router.navigate(["/admin/quizzes"])
      },
      (error) => {
        Swal.fire("Error !!", "Something Went wrong", 'error');
      }
    )
  }

}
