import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin} from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userId: string;
  isLoading = false;
  userDetails: any;
  userTags: any;
  userQuestions: any;
  currentdate = new Date;

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (sessionStorage.getItem('authStatus') !== 'grant') {
      this.router.navigate(['login']);
    } else {
      this.getData();
    }
  }

  getData() {
    this.isLoading = true;
    forkJoin(
      this.userService.GetUserByID(this.userId),
      this.userService.GetUserTags(this.userId),
      this.userService.GetUserQuestions(this.userId)
    ).subscribe(
      data => {
        this.userDetails = JSON.parse(JSON.stringify(data))[0].items[0];
        this.userTags = JSON.parse(JSON.stringify(data))[1].items;
        this.userQuestions = JSON.parse(JSON.stringify(data))[2].items;
        this.isLoading = false;
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.router.navigated = false;
          this.router.navigate(['login']);
          return null;
        }
        else {
        }
        this.isLoading = false;
      });
  }

  compareDate (dataDate) {
    var oneDay = 24 * 60 * 60 * 1000;
    let fDate = new Date(this.currentdate);
    let tDate = new Date(this.datePipe.transform(dataDate * 1000, 'yyyy-MM-dd HH:mm:ss'));
    debugger;
    return Math.round((fDate.getTime() - tDate.getTime()) / oneDay);
  }
}
