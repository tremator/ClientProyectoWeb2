import { Component, OnInit } from '@angular/core';
import { NewsSourceService } from '../services/news-source.service';

@Component({
  selector: 'app-news-sources',
  templateUrl: './news-sources.component.html',
  styleUrls: ['./news-sources.component.css']
})
export class NewsSourcesComponent implements OnInit {

  sources: any;

  constructor(private service:NewsSourceService) { 
    this.sources = [];
  }

  ngOnInit(): void {
    this.getSources();
  }

  getSources(){
    var userId = parseInt(localStorage.getItem("userId"));
    this.service.getUserSources(userId).subscribe((response)=>{
      console.log(response);
      this.sources = response;
    })
  }
  deleteSource(id:number){
    this.service.deleteSource(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

}
