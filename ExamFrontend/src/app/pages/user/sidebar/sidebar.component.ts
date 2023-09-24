import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any

  constructor(private _cal:CategoryService){

  }

  ngOnInit(): void {
   this._cal.categories().subscribe(
    (data)=>{
      this.categories=data
    },
    (eroor)=>{

    }
   )
  }

 

}
