import { Component, OnInit } from '@angular/core';
import { NewsSourceService } from '../services/news-source.service';
import { CategoryService } from '../services/category.service';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NewsService } from '../services/news.service';
import { SEARCH, NEWS_FILTER, CHARGE, USER_TAGS } from '../services/queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  news : any;
  categories: any;
  newsSources: any;
  user:any;
  data: any;
  isAdmin : boolean;
  tags: any;
  dataTags: any;
  form: any = {
    word: ""
  }
  constructor(private apollo: Apollo,private newsSourcesService: NewsSourceService, private categoiesService: CategoryService, private authService: AuthService, private router: Router, private NewsService: NewsService) { 
    this.news = [];
    this.categories = [];
    this.newsSources = [];
    this.tags = [];
  }

  ngOnInit(): void {

    var user = localStorage.getItem("userId");
    this.authService.getUser(parseInt(user)).subscribe((response)=>{
      console.log(response);
      this.user = response;
      if(this.user.role.name == "Admin"){
        this.isAdmin = Boolean(true);
      }else{
        this.isAdmin = Boolean(false);
      }
      console.log("variable admin"+this.isAdmin);
    })
    
    this.newsSourcesService.getUserSources(parseInt(user)).subscribe((response)=>{
      //console.log(response);
      this.newsSources = response;
      console.log(this.newsSources);
      if(this.newsSources.length == 0){
        this.redirect();
      }
    });

    
    this.categoiesService.getCategories().subscribe((response)=>{
      //console.log(response);
      this.categories = response;
    })

    /*this.newsSourcesService.getNews(parseInt(user)).subscribe((response)=>{
      console.log(response);
      this.news = response;
    }); */
    
    this.apollo.watchQuery({
        query: CHARGE,
        fetchPolicy: 'network-only',
        variables: {
          input: parseInt(user)
        }
    }).valueChanges.subscribe(result => {
      console.log("this is the result Data");
      console.log(result.data);

      this.data = result.data;
     
      this.news = this.data.charge ;
      console.log("this is the news")
      console.log(this.news)
    })
    this.getTags();
  }
  redirect(){
    this.router.navigate(['/firstVisit']);
  }

  filter(id:number){
    var userId = parseInt(localStorage.getItem("userId"));
    this.apollo.watchQuery({
      query: NEWS_FILTER,
      fetchPolicy: 'network-only',
      variables: {
        userId: userId,
        category: id
      }
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.news = this.data.newsFilter;
    })
  }

  logOut(){
    var userId = localStorage.getItem("userId");
    localStorage.clear();
    this.authService.logout(parseInt(userId)).subscribe(result => {
      console.log("loggedOut")
    });
    this.router.navigate([''])
  }
  search(){
    const {word} = this.form;
    var user = localStorage.getItem("userId");
    this.apollo.watchQuery({
      query: SEARCH,
      fetchPolicy: 'network-only',
      variables: {
        id: parseInt(user),
        word: word
      }
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.news = this.data.search
      console.log(this.news)
    });
  }
  getTags(){
    var user = localStorage.getItem("userId");
    this.apollo.watchQuery({
      query: USER_TAGS,
      fetchPolicy: 'network-only',
      variables: {
        id: parseInt(user)
      }
    }).valueChanges.subscribe(result => {
      this.dataTags = result.data;
      this.tags = this.dataTags.userTags;
      console.log(this.tags);
    })
  }

  tagsFilter(tag: string){
    var user = localStorage.getItem("userId");
    this.apollo.watchQuery({
      query: NEWS_FILTER,
      fetchPolicy: 'network-only',
      variables: {
        userId: parseInt(user),
        tag: tag
      }
    }).valueChanges.subscribe(result => {
      this.data = result.data;
      this.news = this.data.newsFilter;
    });
  }
}
