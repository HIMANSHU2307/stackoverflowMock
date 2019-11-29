import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from '../services/question-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  isLoading = false;
  dataSource: any;
  currentdate = new Date;

  constructor(private router: Router, private questionService: QuestionServiceService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (sessionStorage.getItem('authStatus') !== 'grant') {
      // this.router.navigate(['login']);
    } else {
      this.getData();
    }
    this.getData();
  }

  getData () {
    this.isLoading = true;
    this.questionService.GetQuestionList()
      .subscribe(data => {
        this.dataSource = JSON.parse(JSON.stringify(data)).items;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        // debugger;
        if (err.status == 401) {
          this.router.navigated = false;
          this.router.navigate(['login']);
          return null;
        } else {
          alert('An Error Occured.');
        }
        this.isLoading = false;
      });
  }

  toUserProfile(id) {
    this.router.navigate(['userprofile', id]);
  }

  compareDate (dataDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    let fDate = new Date(this.currentdate);
    let tDate = new Date(this.datePipe.transform(dataDate * 1000, 'yyyy-MM-dd HH:mm:ss'));
    debugger;
    return Math.round((fDate.getTime() - tDate.getTime()) / oneDay);
  }
}
