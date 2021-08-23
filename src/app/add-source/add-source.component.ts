import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NewsSourceService } from '../services/news-source.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-source',
  templateUrl: './add-source.component.html',
  styleUrls: ['./add-source.component.css']
})
export class AddSourceComponent implements OnInit {
  categories: any;
  form: any = {
    name: "",
    address: "",
    category: 0
  }

  constructor(private categoryService: CategoryService,private newsSourcesService: NewsSourceService, private router: Router) { 
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=>{
      console.log(response);
      this.categories = response;
    })
  }

  submit(){
    console.log(this.form);
    var userId = localStorage.getItem("userId");
    const {name,address,category} = this.form;
    var info = {
      "name": name,
      "url": address,
      "categoryId": parseInt(category),
      "userId": parseInt(userId)
    }
    this.newsSourcesService.postSource(info).subscribe((response)=>{
      console.log(response);
      this.redirect();
    })
  }

  redirect(){
    this.router.navigate(['/newsSources']);
  }
}
