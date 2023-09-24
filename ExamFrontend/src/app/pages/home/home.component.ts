import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isLoggedIn = false;
  currentUserName: any = null;

  constructor(private login: LoginService, private router: Router) {}

  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.login.loginSubjectStatus.asObservable().subscribe(
      (data) => {

        if (this.login.status) {

          this.isLoggedIn = this.login.isLoggedIn();
          this.currentUserName = this.login.getUserDetials();

        } else if (!this.login.status) {

          this.isLoggedIn = false;
          this.currentUserName = null;

        }
      }
    )
  }

  public profile() {
    if (this.login.getUserRole()=='ADMIN') {

      this.router.navigate(['/admin/home'])
      
    }else  if (this.login.getUserRole()=='NORMAL'){

      //redirect ..NORMAL: normal-dashboard
     
      this.router.navigate(['/user-dashboard/home'])
    }
    
  }

}
