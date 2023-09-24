import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  public evalQuiz(questions: any,username:any) {
    return this.http.post(`${baseUrl}/question/eval-quiz/${username}`,questions)
  }

  constructor(private http:HttpClient) { }

  public viewQuestionsbyQidAdmin(questionId:any){
   return this.http.get(`${baseUrl}/question/quiz/admin/${questionId}`,questionId)
  }

  public viewQuestionsbyQidForTest(qId:any){
    return this.http.get(`${baseUrl}/question/quiz/${qId}`,qId)
   }

  public getQuestion(questionId:any){
    return this.http.get(`${baseUrl}/question/${questionId}`,questionId)
   }

  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/${questionId}`,questionId)
   }

   public addQuestion(question:any){
    console.log(question)
    return this.http.post(`${baseUrl}/question/`,question);
   }

   public updateQuestion(question:any){
    return this.http.put(`${baseUrl}/question/`,question)
   }
 
 

  

}
