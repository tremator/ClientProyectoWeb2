import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  id: number;
  category: any;
  form: any = {
    name: ""
  }

  constructor(private service: CategoryService, private router: Router, private activateRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getCategoryId();
    this.getCategory();
  }

  getCategoryId() {
    this.activateRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
    });
  }

  getCategory(){
    this.service.getCategory(this.id).subscribe((response)=>{
      console.log(response);
      this.category = response;
      this.form = {
        name: this.category.name
      }
    })
  }

  submit(){
    const {name} = this.form;
    var info = {
      "id": this.id,
      "name" : name
    }
    this.service.updateCategories(this.id,info).subscribe((response) => {
      console.log(response);
      this.redirect();
    })
  }

  redirect(){
    this.router.navigate(['/categories']);
  }
}
