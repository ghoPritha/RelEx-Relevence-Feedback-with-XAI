import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from '../app-config.service';
import { SpinnerService } from '../spinner/spinner.service';
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
  title: string = '';
  content: string = '';
  releIrrevenatList: any[] = [];
  queryTerm: any;
  // releIrreleselected: boolean = false;
  allSelected: boolean = false
  allSelectedLabel: any = '';
  disableSubmit: boolean = true;
  keylist: string = '';
  noOfSelected: number = 0;
  bntStyle: any ;
  reveiwedResult: boolean = false;
  constructor(public dialog: MatDialog, public spinnerService: SpinnerService, private appConfigService: AppConfigService, private newSearchService: NewSearchService) {
    // console.log(spinnerService.visibility.value)
  }

  ngOnInit(): void {

  }

  search(): void {
    if (this.query !== "") {
      this.queryTerm = this.query;
      this.showResult = true;
      this.searchResult = [];
      this.newSearchService.sendQuery(this.query).subscribe(response => {
        // console.log("response", response);
        this.p = 1;
        this.searchResult = response;
        this.releIrrevenatList = this.searchResult
        // this.searchResult = (<SearchResponse>response).resultList;
        // this.count = (<SearchResponse>response).count;
        // this.synonym = (<SearchResponse>response).synonymList;
        // this.totalSize = (<SearchResponse>response);
      },
        err => console.error(err),
      );
    }
  }
  openDialog(eventName: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        name: this.allSelectedLabel,
        event: eventName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Cancel') {
        this.allSelectedLabel = null;
      } else if (result.event == 'Proceed') {
        this.allSelectedLabel = null;
        // this.openDialog('closed');
      }
    });
  }
  openWindow(link: ResultList): void {
    this.openNewTab = true;
    this.title = link.title;

    this.keylist = link.KeyList;
    this.content = link.abstract;
  }

  onChange(docId: any, isChecked: any): void {
    // console.log(docId, isChecked.target.checked)
    if (this.allSelectedLabel == 'relevant') {
      this.releIrrevenatList.forEach((each) => {
        each.relevant = true
      }
      )
    }
    else if (this.allSelectedLabel == 'irrelevant') {
      this.releIrrevenatList.forEach((each) => {
        each.relevant = false
      })
    }
    this.noOfSelected = 0
  }

  // handleChange($event: Event) {
  //   console.log($event, $event.target)
  //   this.allSelected = true
  //   this.allSelectedLabel =  $event.target
  // // throw new Error('Method not implemented.');
  // }

  submit() {
    // console.log("response", this.releIrrevenatList);
    if (this.allSelectedLabel == 'relevant' || this.allSelectedLabel == 'irrelevant') {
      this.openDialog('submit');
    }
    this.newSearchService.sendFeedback(this.releIrrevenatList).subscribe(response => {
      console.log("response", response);
      this.p = 1;
      this.reveiwedResult = true;
      
      this.searchResult = response;
      this.releIrrevenatList = this.searchResult
    },
      err => console.error(err),
    );
  }

  public markReleIrrele(event: any, item: any, relevance: boolean) {
    // console.log(item, relevance)
    // this.releIrreleselected = true;
    let selectedDoc = {
      docno: item.docno,
      item: item,
      relevant: relevance
    };
    this.releIrrevenatList.forEach((each) => {
      if (each.docno == item.docno) {
        if (each.relevant == null) {
          console.log("empty", each.relevant, each.relevant == null, each.relevant == '')
          each.relevant = relevance
        }
        else {
          console.log("already has", each.relevant, each.relevant == null, each.relevant == '')
          each.relevant = !each.relevant
        }
        if (each.relevant) {
          this.noOfSelected++;
          each.bntStyle = true;
        }
        else {
          this.noOfSelected--;
          each.bntStyle = false;
        }
      }
      else {
        if (each.relevant == null) {
          each.relevant = false
        }
      }
    }
    )
    console.log(this.releIrrevenatList)
    // console.log(this.releIrrevenatList.some((item) => item.docno == selectedDoc.docno))
    // if (this.releIrrevenatList.some((item) => item.docno == selectedDoc.docno)) {
    //   let itemIndex = this.releIrrevenatList.findIndex(item => item.docno == selectedDoc.docno);
    //   this.releIrrevenatList[itemIndex] = selectedDoc;
    // }
    // else {
    //   this.releIrrevenatList.forEach
    //   this.releIrrevenatList.push(selectedDoc)
    // }
    if (this.noOfSelected >= 3) {
      this.disableSubmit = false;
    }
    // console.log('releIrrevenatList', this.releIrrevenatList)
  }

  showExplanattion(event: any, item: any){

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

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  eventName: any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.eventName = data.event
  }

  onNoClick(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  onYesClick(): void {
    this.dialogRef.close({ event: 'Proceed' });
  }
}