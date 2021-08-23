import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { NewsSourceService } from '../services/news-source.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-source',
  templateUrl: './update-source.component.html',
  styleUrls: ['./update-source.component.css']
})
export class UpdateSourceComponent implements OnInit {
  categories: any;
  form: any = {
    name: "",
    address: "",
    category: 0
  }
  source: any;
  id: number;
  constructor(private categoryService: CategoryService,private newsSourcesService: NewsSourceService, private router: Router, private activateRoute:ActivatedRoute  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSourceId();
    this.getSource();

  }


  getSource(){
    this.newsSourcesService.getSource(this.id).subscribe((response)=>{
      console.log(response);
      this.source = response;
      this.form ={
        name: this.source.name, 
        address: this.source.url,
        category: this.source.categoryId
      }
    })
  }

  getSourceId() {
    this.activateRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
    });
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
      "id": this.id,
      "name": name,
      "url": address,
      "categoryId": parseInt(category),
      "userId": parseInt(userId)
    }
    this.newsSourcesService.updateSource(this.id,info).subscribe((response)=>{
      console.log(response);
      this.redirect();
    })
  }

  redirect(){
    this.router.navigate(['/newsSources']);
  }

}
