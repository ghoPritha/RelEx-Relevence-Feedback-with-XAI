import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from '../app-config.service';
import { SpinnerService } from '../spinner/spinner.service';
import { NewSearchService } from './new-search.service';
import { ResultList } from './searchResponse';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.css']
})
export class NewSearchComponent implements OnInit {
  p: number = 1;
  imageSrc :string | undefined;
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
  keylist: string[] = [];
  noOfSelected: number = 0;
  bntStyle: any;
  reveiwedResult: boolean = false;
  constructor(private domSanitizer: DomSanitizer, public dialog: MatDialog, public spinnerService: SpinnerService, private appConfigService: AppConfigService, private newSearchService: NewSearchService) {
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
        console.log("response", response);
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

  openPlotDialog(): void {
    const dialogRef = this.dialog.open(ShowPlotDialog, {
      data: {
        imagesource: this.imageSrc
      },
    });
  }
  openWindow(link: ResultList): void {
    // this.openNewTab = true;
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

  onSubmit() {
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

  highlightedText(text: string, keywords: string[], query: string) {
    if (!text || !keywords || !query) {
      return '';
    }

    const regex = new RegExp(`(${keywords.join('|')})|(${query})`, 'gi');
    const highlighted = text.replace(regex, (match, p1, p2) => {
      if (p1) {
        return `<span style='background-color:yellow'>${match}</span>`;
      } else if (p2) {
        return `<span style='background-color:purple'>${match}</span>`;
      } else {
        return match;
      }
    });

    return highlighted;
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
    else {
      this.disableSubmit = true
    }
    // console.log('releIrrevenatList', this.releIrrevenatList)
  }

  showExplanattion(event: any, item: any) {

  }

  // public markIrrele(event:any, item:any){
  //   let irrelevantDoc={
  //     docno : item.docno,
  //     relevant: false
  //   };
  //   this.releIrrevenatList.push(irrelevantDoc)
  //   console.log(event, item)

  // }
  generatePlot() {
    this.newSearchService.generatePlot().subscribe(response => {
      console.log("search result", response);

      const img = new Uint8Array(response);
      
      const blob = new Blob([img], { type: 'image/png' });
      console.log("search result", blob);
      const reader = new FileReader();
        reader.onloadend = () => {
          this.imageSrc = reader.result as string;
          console.log(this.imageSrc)
          this.openPlotDialog();

        };
        reader.readAsDataURL(blob);
    });
  }
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

@Component({
  selector: 'show-plot-dialog',
  templateUrl: 'showPlot.html',
})
export class ShowPlotDialog {
  imagesource: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.imagesource = data.imagesource
    console.log(this.imagesource)
  }
}