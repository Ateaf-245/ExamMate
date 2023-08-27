import { Component } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:'',
  };

  constructor(private _snackBar: MatSnackBar, private login:LoginService,private router:Router){}

  formSubmit(){
    // console.log("login form submit")

    if(this.loginData.username.trim()==''|| this.loginData.username==null){
      this._snackBar.open('Username is required !!', '',{
        duration: 3000,
      });
      return
    }
    if(this.loginData.password.trim()==''|| this.loginData.password==null){
      this._snackBar.open('Password is required !!', '',{
        duration: 3000,
      });
      return
    }

    //request ot server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
         //success
         //console.log(data)

         //sweat alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        
        })

        //login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user :any)=>{
            this.login.setUser(user);

            if (this.login.getUserRole()=='ADMIN') {

              //redirect ..ADMIN: admin-dashboard
              this.router.navigate(['admin'])
              this.login.loginSubjectStatus.next(true);
              
            }else  if (this.login.getUserRole()=='NORMAL'){

              //redirect ..NORMAL: normal-dashboard
              this.router.navigate(['user-dashboard'])
              this.login.loginSubjectStatus.next(true);

            }else{
              this.login.logout();
            }
          },
          
          (error:any)=>{
           
            // console.log(error)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
    
            Toast.fire({
              icon: 'error',
              title: 'Something went wrong !!'
            })
    
          }
        );
           
      },
      (error)=>{

        //error
        // console.log(error)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title: 'InValid Credentails'
        })

        //clears the username & password
        this.formClear()
      }
    )
  }

  formClear(){
    this.loginData.username='';
    this.loginData.password='';
  }

   // password
   hide = true;

}
