import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewSearchService {

  serverData: any;
  employeeData: any;

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }
  // sayHi() {
  //   this.http.get('http://127.0.0.1:5002/').subscribe(data => {
  //     this.serverData = data as JSON;
  //     console.log(this.serverData);
  //   })
  // }

  sendQuery(query: string): Observable<any> {
    let queryString = new HttpParams().set('searchString', query);
    // console.log('this.http.get'6
    return this.http.get('http://127.0.0.1:5251/query', { params: queryString });
    // return this.http.get("./assets/images/like.png");
    // return this.http.get("./assets/keyPhrase.json");

  }

  generatePlot(): Observable<any> {
    // console.log('this.http.get'6
    return this.http.get('http://127.0.0.1:5251/plot', { responseType: 'arraybuffer'});
    // return this.http.get("./assets/images/like.png");
    // return this.http.get("./assets/keyPhrase.json");

  }

  // fetchSearchResults(): Observable<any> {
  //   // this.http.get('http://127.0.0.1:5000').subscribe(data => {  
  //   //   this.employeeData = data as JSON;
  //   //   console.log(this.employeeData);
  //   // })
  //   // return this.employeeData
  //   return this.http.get("./assets/keyPhrase.json");

  // }

  sendFeedback(feedbackList: any): Observable<any> { 
    let feedbacksList = new HttpParams().set('feedbackList', feedbackList);
    console.log('feedbackList', feedbackList)
    return this.http.post('http://127.0.0.1:5251/feedback', JSON.stringify(feedbacksList), httpOptions)
    // return this.http.request(
    //   'POST',
    //   'http://127.0.0.1:5000/feedback',
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json'
    //     }),
    //     body: JSON.stringify(feedbacksList)
    //   });

  }
  handleError(arg0: string, hero: any): (err: any, caught: Observable<Observable<any>>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }
}
