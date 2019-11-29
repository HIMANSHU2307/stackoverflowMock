import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionServiceService {

  constructor(private http: HttpClient) { }

  GetQuestionList() {
    return this.http.get('https://api.stackexchange.com/2.2/questions/featured?order=desc&sort=activity&site=stackoverflow');
  }
}
