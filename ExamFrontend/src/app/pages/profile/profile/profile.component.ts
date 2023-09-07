import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/User/user.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any = null;
  constructor(private login:LoginService){}

  ngOnInit(): void {
    this.user=this.login.getUserDetials()
  }
}
