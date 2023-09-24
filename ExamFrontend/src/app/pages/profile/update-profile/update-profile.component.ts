import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';
import { LoginService } from 'src/app/services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/User/user.service';
import Swal from 'sweetalert2';
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  username:any
  user:any

  changePwd:any = false

  constructor(private login:LoginService,
              private _snackBar:MatSnackBar,
              private userService:UserService,
              private sweetAlert:SweetAlertService,
              private router:Router,
              private _user:UserService,
              ){

  }

  ngOnInit(): void {
    this.username=this.login.getUserDetials().user.username

    this._user.getUser(this.username).subscribe(
      (data)=>{
        this.user=data
      },
      (error)=>{
        Swal.fire('Error','Unable to load the data','error')
      }
    )

    this.user.password =''


  }

  formSubmit(){
    if (this.user.username == '' || this.user.username == null ||
      this.user.firstname == '' || this.user.firstname == null ||
      this.user.lastname == '' || this.user.lastname == null ||
      this.user.email == '' || this.user.email == null ||
      this.user.phone == '' || this.user.phone == null) {

      // snack bar
      this._snackBar.open('Please fill all the fields', 'close', {
        duration: 3000,
      });

      return;
    }

    if(this.changePwd){
      if (this.user.username == '' || this.user.username == null){
        this._snackBar.open('Please emtter the new password', 'close', {
          duration: 3000,
        });
        return;
      }
    }

    // add user
    this.userService.updateUser(this.user).subscribe(
      (data) => {
        //success
        //sweat alert
        this.sweetAlert.showToast('success','Successfully Registered')
        if (this.login.getUserRole()=='ADMIN') {

          this.router.navigate(['/admin/profile'])
          
        }else  if (this.login.getUserRole()=='NORMAL'){
    
          //redirect ..NORMAL: normal-dashboard
         
          this.router.navigate(['/user-dashboard/profile'])
        }
      },
      (error) => {
        //error
        console.log(error.error.message)
        this.sweetAlert.showToast('error',`${error.error.message}`)
      }
    )
  }


  // password
  hide = true;

  // Email
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
