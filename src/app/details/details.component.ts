import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id: number;
  notice: any;

  constructor(private newsService: NewsService, private router: Router, private activateRoute: ActivatedRoute) { 
    this.id = 0;
  }

  ngOnInit(): void {
    this.getNoticeId();
    this.getNotice();
  }

  getNoticeId() {
    this.activateRoute.paramMap.subscribe(param => {
      this.id = parseInt(param.get('id'));
    });
  }
  getNotice(){
    this.newsService.getNew(this.id).subscribe((response) => {
      console.log(response);
      this.notice = response;
    })
  }

}
