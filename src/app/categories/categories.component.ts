import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: any;

  constructor(private service: CategoryService) { 
    this.categories = []
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.service.getCategories().subscribe((response) => {
      console.log(response);
      this.categories = response;
    })
  }

  deleteCategory(id: number){
    this.service.deleteCategory(id).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    })
  }

}
