import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public Quizzes(){
    return this._http.get(`${baseUrl}/quiz/`)
  }

  public addQuiz(Quiz:any){
    return this._http.post(`${baseUrl}/quiz/`,Quiz)

  }

  public deleteQuiz(qid:any){
    return this._http.delete(`${baseUrl}/quiz/${qid}`,qid)
  }


  //get the quiz by quizId 
  public getQuizById(quizId:any){
    return this._http.get(`${baseUrl}/quiz/${quizId}`,quizId)

  }

  //update the quiz
  public updateQuiz(Quiz:any){
    return this._http.put(`${baseUrl}/quiz/`,Quiz)

  }
}
