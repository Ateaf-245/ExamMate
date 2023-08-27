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
   currentUserName:any = null;
 

  constructor(private login:LoginService,private router:Router){   
  }

  
  ngOnInit(): void {

    this.isLoggedIn = this.login.isLoggedIn();
    this.currentUserName = this.login.getUserDetials();

  this.login.loginSubjectStatus.asObservable().subscribe(
    (data)=>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.currentUserName = this.login.getUserDetials();
    }
  ) 
    
  }
  
  public profile(){
    this.router.navigate(['/admin/profile'])
  }

  public logout(){
    this.login.logout()
    this.isLoggedIn = false;
    this.currentUserName =null;
    this.router.navigate(['login'])
  
  }
}
