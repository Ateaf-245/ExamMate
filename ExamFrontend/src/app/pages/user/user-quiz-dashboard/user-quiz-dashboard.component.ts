import { Component , OnInit} from '@angular/core';
import { QuizResultService } from 'src/app/services/quizResult/quiz-result.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-quiz-dashboard',
  templateUrl: './user-quiz-dashboard.component.html',
  styleUrls: ['./user-quiz-dashboard.component.css']
})
export class UserQuizDashboardComponent implements OnInit{
 
  currentUser:any
  QRStatus = true

  QRdata:any
  dateObj:any
  dateTimeString:any;

  // dashboard
  totalAttempts:any
  numberOfQuiz:any
  averageScore:any
  mostAttemptedQuiz:any


  constructor(private _quizResult:QuizResultService,
              private _login:LoginService){}

  ngOnInit(): void {

    this.currentUser = this._login.getUserDetials();
    this._quizResult.getDashboradDataByUser(this.currentUser.username).subscribe(
      (data:any)=>{
        this.totalAttempts=data.totalAttempts;
        this.numberOfQuiz=data.numberOfQuiz
        this.mostAttemptedQuiz=data.mostAttemptedQuiz
        this.averageScore=data.averageScore

      },
      (error)=>{
        Swal.fire('error','unable to load the data from server','error')
      })

    this._quizResult.getDataByUser(this.currentUser.username).subscribe(
      (data)=>{
        this.QRdata=data
        if(!this.QRdata){
          this.QRStatus=false
        }
        for (let index = 0; index < this.QRdata.length; index++) {
          this.dateTimeString = this.QRdata[index].lastAttemptedOn
          this.dateObj = new Date(this.dateTimeString)
          this.QRdata[index].lastAttemptedOn = `${this.dateObj.toLocaleDateString()} ${this.dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}` ;
        } 
      }, 
      (error)=>{
        Swal.fire('error','unable to load the data from server','error')
      }
    )
  }

}
