import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('authStatus') == 'grant') {
      this.isLoggedIn = true;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
