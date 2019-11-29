import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  GetUserByID(id) {
    return this.http.get('https://api.stackexchange.com/2.2/users/' + id + '?order=desc&sort=reputation&site=stackoverflow');
  }

  GetUserTags(id) {
    return this.http.get('https://api.stackexchange.com/2.2/users/' + id + '/tags?order=desc&sort=popular&site=stackoverflow');
  }

  GetUserQuestions(id) {
    return this.http.get('https://api.stackexchange.com/2.2/users/' + id + '/questions?order=desc&sort=activity&site=stackoverflow');
  }
}
