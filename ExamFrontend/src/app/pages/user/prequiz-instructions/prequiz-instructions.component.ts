import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz-instructions',
  templateUrl: './prequiz-instructions.component.html',
  styleUrls: ['./prequiz-instructions.component.css']
})
export class PrequizInstructionsComponent implements OnInit {

  qid: any
  quiz: any
  quizTime: any

  questionLength: any

  constructor(private _activatedroute: ActivatedRoute,
    private _quiz: QuizService,
    private _question: QuestionService,
    private _router: Router) { }

  ngOnInit(): void {
    this.qid = this._activatedroute.snapshot.params['qid']

    this._quiz.getQuizById(this.qid).subscribe(
      (data) => {
        this.quiz = data

        this._question.viewQuestionsbyQidForTest(this.qid).subscribe(
          (data: any) => {
            this.questionLength = data.length
          })
      },
      (error) => {
        Swal.fire("Error !!", "Error in loading Quiz data !", "error")
      }
    )
  }

  startQuiz() {

    if (this.questionLength == 0) {

      Swal.fire("Error !!", "Error in loading the questions !", "error")
    } else {

      Swal.fire({
        title: 'Please Confirm?',
        text: "Do you want to start the Quiz!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Start!'
      }).then((result) => {

        if (result.isConfirmed) {
          this._router.navigate([`/start/` + this.qid])
        }
      })
    }
  }

  getQuizTime() {
    this.quizTime = this.quiz.numberOfQuestions * 0.5 * 60;
    let mm = Math.floor(this.quizTime / 60)
    let ss = this.quizTime - mm * 60
    if (ss == 0) {
      return `${mm} minutes`
    }
    return `${mm} minutes & ${ss} seconds`
  }
}
