import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  qId:any
  qTitle:any
  i:any

  questions:any=[]

constructor(private _activedRouter:ActivatedRoute,
            private _questions:QuestionService,
            private _router:Router){

}

  ngOnInit():void {
    this.qId = this._activedRouter.snapshot.params['qid'];
    this.qTitle = this._activedRouter.snapshot.params['title'];
   
    this._questions.viewQuestionsbyQidAdmin(this.qId).subscribe(
      (data) => {
       
        this.questions = data;
      },
      (error) => {
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    );
  }

  updateQuestion(questionId:any){
    this._router.navigate([`/admin/update-question/${questionId}`])
  }

  deleteQuestion(questionId:any){
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

        this._questions.deleteQuestion(questionId).subscribe(
          (data) => {

            this.questions = this.questions.filter((question: any) => question.questionId != questionId)
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
