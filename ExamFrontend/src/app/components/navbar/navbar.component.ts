import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  currentUserName: any = null;
  da:any

  constructor(private login: LoginService, private router: Router) {}

  ngOnInit(): void {

    this.login.getCurrentUser().subscribe(
      (data)=>{
        let userStr = localStorage.getItem("user");
        if(userStr!=null){
        this.da= JSON.parse(userStr)
        }
        this.isLoggedIn = this.login.isLoggedIn();
        this.currentUserName = this.da
        
      }
    )
  

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

      this.router.navigate(['/admin/profile'])
      
    }else  if (this.login.getUserRole()=='NORMAL'){

      //redirect ..NORMAL: normal-dashboard
     
      this.router.navigate(['/user-dashboard/profile'])
    }
    
  }

  public logout() {
    this.login.logout()
    this.isLoggedIn = false;
    this.currentUserName = null;
    this.router.navigate(['login'])

  }
}
