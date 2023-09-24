import { Component,OnInit } from '@angular/core';
import { QuizResultService } from 'src/app/services/quizResult/quiz-result.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{

  QRdata:any


  constructor(private _quizResult:QuizResultService,){}

  ngOnInit(): void {
   this._quizResult.getDashboradDataAdmin().subscribe(
    (data)=>{

      this.QRdata=data
   },
   (error)=>{

   }
   )
  }

}
