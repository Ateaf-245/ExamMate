import { Component,OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/User/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  user={
    username:'',
    email:'',
    password:''
  }

  otp:any
  otpSentStatus = false
  otpVerified= false

  constructor(private _user:UserService,
              private _router:Router,
              private _snack:MatSnackBar){

  }

  SentOTP(){
    if (this.user.username.trim()==''|| this.user.username==null) {
      // show msg
      this._snack.open("Username is Required","close",{
        duration:3000
      });
      return
    }
    if (this.user.email.trim()==''|| this.user.email==null) {
      // show msg
      this._snack.open("registered Email is Required","close",{
        duration:3000
      });
      return

    }

    this._user.sendOTP(this.user).subscribe(
      (data:any)=>{
        console.log(data)
        if (data.message=='Email sent successfully') {
          this.otpSentStatus=true
          Swal.fire('Success',data.message,'success')
        }else{
          Swal.fire('Error',data.message,'error')
        }
      },
      (error)=>{
        this.otpSentStatus=false
        console.log(error)
      }
    )
  }

  VerfiyOTP(){

    if (this.user.username.trim()==''|| this.user.username==null) {
      // show msg
      this._snack.open("Username is Required","close",{
        duration:3000
      });
      return
    }
    if (this.otp==''|| this.otp==null) {
      // show msg
      this._snack.open("Please enter the sent OTP","close",{
        duration:3000
      });
      return
    }

    this._user.verifyOTP(this.user,this.otp).subscribe(
      (data:any)=>{
        if (data.message=='OTP is Verified successfully') {
          this.otpVerified=true
          Swal.fire('Success',data.message,'success')
        }else{
          Swal.fire('Error',data.message,'error')
        }
  
      },
      (error)=>{
        this.otpVerified=false
        console.log(error)
      }
    )

  }

  ChangePassword(){

    if (this.user.username.trim()==''|| this.user.username==null) {
      // show msg
      this._snack.open("Username is Required","close",{
        duration:3000
      });
     
      return
    }
    if (this.user.password.trim()==''|| this.user.password==null) {
      // show msg
      this._snack.open("please enter the new password","close",{
        duration:3000
      });
      return
    }

    this._user.changePWD(this.user).subscribe(
      (data:any)=>{
        if (data.message=='Password changed successfully') {
        Swal.fire('Success',data.message,'success')
        this._router.navigate([`/login`])
        }else{
          Swal.fire('Error',data.message,'error')
        }
      },
      (error)=>{
        Swal.fire('Error',error.message,'error')
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
