import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  form: any ={
    name : ""
  }

  constructor(private service: CategoryService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){

    const {name} = this.form;

    var info = {
      "name": name
    }

    this.service.postCategory(info).subscribe((response) => {
      console.log(response);
      this.redirect();
    })

  }

  redirect(){
    this.router.navigate(['/categories']);
  }

}
