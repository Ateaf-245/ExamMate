import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  user:any;
  username :any
  
  constructor(private login:LoginService,
              private _user:UserService,
              private router:Router){}

  ngOnInit(): void {

    this.username=this.login.getUserDetials().user.username

    this._user.getUser(this.username).subscribe(
      (data)=>{
        this.user=data;
      },
      (error)=>{
        Swal.fire('Error','Unable to load the data','error')
      }
    )
  }

  updateProfile(){
    if (this.login.getUserRole()=='ADMIN') {

      this.router.navigate([`/admin/profile/update/${this.user.id}`])
      
    }else  if (this.login.getUserRole()=='NORMAL'){

      //redirect ..NORMAL
      this.router.navigate(['/user-dashboard/profile/update'])
    }
  }

}

