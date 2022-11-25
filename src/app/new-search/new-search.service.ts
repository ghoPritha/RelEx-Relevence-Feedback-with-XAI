import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewSearchService {

  serverData: any;
  employeeData: any;
  
  constructor(private http:HttpClient) { }
  sayHi() {
    this.http.get('http://127.0.0.1:5002/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }

  sendQuery(query : string) : Observable<any>{
    let queryString = new HttpParams().set('searchString',query);
    return this.http.get('http://127.0.0.1:5000/heroes',{params:queryString});
  }

  fetchSearchResults() : Observable<any>{
    this.http.get('http://127.0.0.1:5000/heroes').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    })
    return this.employeeData
  }
  
}
