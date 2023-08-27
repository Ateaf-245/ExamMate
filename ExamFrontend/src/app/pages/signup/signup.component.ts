import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/User/user.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from 'sweetalert2';
import baseUrl from '../../services/helper';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  }

  // form submit
  formSubmit() {

    console.log(this.user)

    if (this.user.username == '' || this.user.username == null ||
      this.user.firstname == '' || this.user.firstname == null ||
      this.user.lastname == '' || this.user.lastname == null ||
      this.user.email == '' || this.user.email == null ||
      this.user.password == '' || this.user.password == null ||
      this.user.phone == '' || this.user.phone == null) {

      // snack bar
      this._snackBar.open('Please fill all the fields', 'close', {
        duration: 3000,
      });

      return;
    }

    // add user
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        //console.log(data)

        //sweat alert
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Successfully Registered'
        })

        this.formClear();

      },
      (error) => {
        //error
        // console.log(error)
        // console.log(error.error.message)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'error',
          title:  `${error.error.message}`
        })
      }
    )
  }

  formClear(){
    this.user.username='';
    this.user.firstname='';
    this.user.lastname='';
    this.user.password='';
    this.user.email='';
    this.user.phone='';

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
