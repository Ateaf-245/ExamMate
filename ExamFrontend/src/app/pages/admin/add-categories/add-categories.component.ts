import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  category:any = {
    title:"",
    description:""
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar){

  }

  formSubmit(){

    if (this.category.title.trim() ==''|| this.category.title==null) {
      this._snack.open("Title Required","close",{
        duration:3000
      });
      return
    }
  
    //add 

    this._category.addCategory(this.category).subscribe(
      (data)=>{
        this.formClear();
        Swal.fire("Success !!","Category added successfully",'success');
      },
      (error)=>{
        Swal.fire("Error !!","Something Went wrong",'error');
      }

    )
  }

  formClear(){
    this.category.title="";
    this.category.description="";
  }


}
