import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  public viewQuestionsbyQidAdmin(questionId:any){
   return this.http.get(`${baseUrl}/question/quiz/${questionId}`,questionId)
  }

  public deleteQuestion(questionId:any){
    return this.http.delete(`${baseUrl}/question/quiz/${questionId}`,questionId)
   }
 

  

}
