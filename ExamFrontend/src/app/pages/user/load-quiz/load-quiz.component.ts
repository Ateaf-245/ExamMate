import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  qid:any
  quiz:any

  constructor(private _quiz:QuizService,
              private _activatedRoute:ActivatedRoute){
     
  }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe(
      (params)=>{
        this.qid = params['qid']

        if (this.qid==null) {

          this._quiz.getActiveQuizzes().subscribe(
            (data)=>{
              this.quiz=data
            },
            (error)=>{
              Swal.fire("Error !!", "Error in loading data !", "error")
            }
          )
          
        } else {
          this._quiz.getActiveQuizByCatId(this.qid).subscribe(
            (data)=>{
              this.quiz=data
            },
            (error)=>{
              Swal.fire("Error !!", "Error in loading data !", "error")
            }
          )
        }

      }
      )    
  }
}
