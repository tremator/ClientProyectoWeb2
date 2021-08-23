import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'bearer '+ localStorage.getItem("token")
  })
};
const AUTH_API = 'https://localhost:5001/api/categorys/';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }


  getCategories(){
    return this.http.get(AUTH_API, httpOptions);
  }
  getCategory(id: number){
    return this.http.get(AUTH_API+id, httpOptions);
  }
  postCategory(info:any){
    return this.http.post(AUTH_API,info,httpOptions);
  }
  deleteCategory(id: number){
    return this.http.delete(AUTH_API+id,httpOptions);
  }
  updateCategories(id: number, info: any){
    return this.http.put(AUTH_API+id,info,httpOptions);
  }

}
