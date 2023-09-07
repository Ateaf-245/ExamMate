import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = []

  constructor(private _quizzes: QuizService, 
              private router: Router) {



  }
  ngOnInit(): void {
    this._quizzes.Quizzes().subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

  updateQuiz(_qid: any){
    this.router.navigate([`/admin/update-quiz/${_qid}`])
  }

  deleteQuiz(_qid: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this._quizzes.deleteQuiz(_qid).subscribe(
          (data) => {

            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != _qid)
            Swal.fire("Success !!", "Quiz deleted successfully", 'success');

          },
          (error) => {
            Swal.fire("Error !!", "something went wrong", 'error');
          }
        )
      }

    })
  }

}


