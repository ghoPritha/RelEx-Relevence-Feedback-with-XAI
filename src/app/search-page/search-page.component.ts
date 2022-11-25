import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  query: any;
  searchResults: Array<any> = new Array;
  //sub: Subscription;


  REQUESTS = [
    {type: 'TypeA', name: 'RequestA', amount: 1000, status: 'Draft', dateModified: 1111112211111},
    {type: 'TypeB', name: 'RequestC', amount: 5, status: 'Submitted', dateModified: 1111991111111},
    {type: 'TypeA', name: 'RequestG', amount: 200, status: 'Submitted', dateModified: 1111111441111},
    {type: 'TypeC', name: 'RequestM', amount: 0, status: 'Closed', dateModified: 1111111155111},
    {type: 'TypeE', name: 'RequestB', amount: 0, status: 'Draft', dateModified: 1111111111111},
    {type: 'TypeD', name: 'RequestL', amount: 2000, status: 'Closed', dateModified: 1122111111111},
  ];

  dataSource = new MatTableDataSource(this.REQUESTS);
  columnsToDisplay = ['type', 'name', 'amount', 'status', 'dateModified', 'state'];
  dataSubject = new BehaviorSubject<Element[]>([]);
  showResult: boolean = false;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
  }


  search(): void {
    /*  this.searchService.search(this.query).subscribe(
       data => {
         this.searchResults = data;
       }
     ); */

     this.showResult = true;
  }

  /* getStateColor(status: any) {
    switch(status) {
      case ('Submitted'):
      case ('Draft'):
        return 'green-svg';
        break;
      
      case ('Closed'):
        return 'gray-svg';
        break;
    }
  } */

  // If a request amount is zero, display "FREE", else display the amount
  getAmount(amount: string | number) {
    return (amount === 0 ? 'FREE' : amount+" €");
  }
}

