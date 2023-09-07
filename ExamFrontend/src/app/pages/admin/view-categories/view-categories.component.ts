
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category/category.service';

import Swal from 'sweetalert2';

@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: any[] = [];

constructor(private _categories:CategoryService, private _snack:MatSnackBar){

}
  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data:any)=>{
        this.categories = data
      },
      (error)=>{ 
        Swal.fire('Error !!', 'Error in loading data','error')
        
      //   this._snack.open("Error in loading data","close",{
      //   duration:2000,
      // });
       
      }
    )
  }


}
