import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { NewSearchService } from './new-search.service';
import { ResultList } from './searchResponse';

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.css']
})
export class NewSearchComponent implements OnInit {
  p: number = 1;
  imageSrc = "/assets/images/logo.png";
  imageAlt = "aa";
  public dataSource: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  showResult: boolean = false;
  searchResult: ResultList[] = [];
  // result : SearchResponse = {} as SearchResponse;
  count: number = 0;
  apiBaseUrl: string = "";
  query: string = "";
  openNewTab: boolean = false;
  title: string | undefined;
  content: string | undefined;
  releIrrevenatList: any[] = [];
  queryTerm: any;
  releIrreleselected: boolean = false;
  constructor(private appConfigService: AppConfigService, private newSearchService: NewSearchService) { }

  ngOnInit(): void {

  }

  search(): void {
    if (this.query !== "") {
      this.queryTerm = this.query;
      this.showResult = true;
      this.searchResult = [];
      this.newSearchService.sendQuery(this.query).subscribe(response => {
        console.log("response", response);
        this.p = 1;
        this.searchResult = response;
        // this.searchResult = (<SearchResponse>response).resultList;
        // this.count = (<SearchResponse>response).count;
        // this.synonym = (<SearchResponse>response).synonymList;
        // this.totalSize = (<SearchResponse>response);
      },
        err => console.error(err),
      );
    }
  }

  openWindow(link: ResultList): void {
    this.openNewTab = true;
    this.title = link.docno;
    this.content = link.abstract;
  }

  onChange(docId: any, isChecked: any): void {
    console.log(docId, isChecked.target.checked)

  }

  submit() {
    console.log("response", this.releIrrevenatList);

    this.newSearchService.sendFeedback(this.releIrrevenatList).subscribe(response => {
      console.log("response", response);
      this.p = 1;
    },
      err => console.error(err),
    );
  }

  public markReleIrrele(event: any, item: any, relevance: boolean) {
    console.log(item, relevance)
    this.releIrreleselected = true;
    let selectedDoc = {
      docno: item.docno,
      relevant: relevance
    };
    console.log(this.releIrrevenatList.some((item) => item.docno == selectedDoc.docno))
    if (this.releIrrevenatList.some((item) => item.docno == selectedDoc.docno)) {
      let itemIndex = this.releIrrevenatList.findIndex(item => item.docno == selectedDoc.docno);
      this.releIrrevenatList[itemIndex] = selectedDoc;
    }
    else {
      this.releIrrevenatList.forEach
      this.releIrrevenatList.push(selectedDoc)
    }

    console.log('releIrrevenatList', this.releIrrevenatList)
  }

  // public markIrrele(event:any, item:any){
  //   let irrelevantDoc={
  //     docno : item.docno,
  //     relevant: false
  //   };
  //   this.releIrrevenatList.push(irrelevantDoc)
  //   console.log(event, item)

  // }


}
