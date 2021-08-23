import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'bearer '+ localStorage.getItem("token") })
};
const AUTH_API = 'https://localhost:5001/api/newsSources/';

@Injectable({
  providedIn: 'root'
})
export class NewsSourceService {

  constructor(private http: HttpClient) { }


  getSources(){
    return this.http.get(AUTH_API);
  }
  getSource(id:number){
    return this.http.get(AUTH_API+id);
  }
  postSource(info: any){
    return this.http.post(AUTH_API,info,httpOptions);
  }
  deleteSource(id:number){
    return this.http.delete(AUTH_API+id,httpOptions);
  }
  updateSource(id:number, info: any){
    return this.http.put(AUTH_API+id,info,httpOptions);
  }
  getNews(id:number){
    return this.http.get(AUTH_API+"news/"+id);
  }

  getUserSources(id:number){
    return this.http.get(AUTH_API+"userSources/"+id);
  }

}
