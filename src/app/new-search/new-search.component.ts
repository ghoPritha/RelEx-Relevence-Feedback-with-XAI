import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConfigService } from '../app-config.service';
import { SpinnerService } from '../spinner/spinner.service';
import { NewSearchService } from './new-search.service';
import { ResultList } from './searchResponse';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-new-search',
  templateUrl: './new-search.component.html',
  styleUrls: ['./new-search.component.css']
})
export class NewSearchComponent implements OnInit {
  p: number = 1;
  imageSrc: string | undefined;
  sourceImage = '/assets/images/Logo.png'
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
  tooltipText: string = ''
  selectedKeyList = new Map<string, string[]>();
  selectedKeyWords : string[] = [];

  // buttonText: string = 'Irrelevant'
  relevantTooltip: string = 'This is the document you selected as relevant';
  irrelevantTooltip: string = 'This is the document you left as irrelevant';
  // relevanceToggleText : string = 'Irrelevant'
  constructor(private _bottomSheet: MatBottomSheet, public dialog: MatDialog, public spinnerService: SpinnerService, private appConfigService: AppConfigService, private newSearchService: NewSearchService) {
    // console.log(spinnerService.visibility.value)

  }

  ngOnInit(): void {

  }
  // Search the Query

  onSearch(): void {
    if (this.query !== "") {
      this.queryTerm = this.query;
      this.reveiwedResult = false
      this.noOfSelected = 0

      this.showResult = true;
      this.searchResult = [];
      this.newSearchService.sendQuery(this.query).subscribe(response => {
        console.log("response", response);
        this.p = 1;
        this.searchResult = response.slice(0, 10);
        this.releIrrevenatList = response
        // this.searchResult = (<SearchResponse>response).resultList;
        // this.count = (<SearchResponse>response).count;
        // this.synonym = (<SearchResponse>response).synonymList;
        // this.totalSize = (<SearchResponse>response);
        this.searchResult.forEach(each => {
          each.bntStyle = false;
          each.relevanceToggleText = "Irrelevant"
        })
      },
        err => console.error(err),
      );
    }
  }
  // Marking the relevant irrelevant document
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
          item.relevanceToggleText = "Relevant"
          this.noOfSelected++;
          each.bntStyle = true;
          this.selectedKeyList.set(each.docno, each.KeyList)
          // console.log(this.selectedKeyList)
        }
        else {
          item.relevanceToggleText = "Irrelevant"
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
    // this.selectedKeyList.push
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


  //Submit the feedback 
  onSubmit() {
    // console.log("response", this.releIrrevenatList);
    if (this.allSelectedLabel == 'relevant' || this.allSelectedLabel == 'irrelevant') {
      this.openDialog('submit');
    }
    else {
      this.newSearchService.sendFeedback(this.releIrrevenatList).subscribe(response => {
        console.log("feedback response", response);
        this.p = 1;
        this.reveiwedResult = true;

        this.searchResult = response.slice(0, 10);;
        this.releIrrevenatList = this.searchResult
        this.openBottomSheet()
      },
        err => console.error(err),
      );
    }
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

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

  //open dialog for "Select all as Relevant", "Select all as irrelevant"
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
    this.openNewTab = true;
    this.title = link.title;

    this.keylist = link.KeyList;
    this.content = link.abstract;
  }

  fetchTooltipText(KeyList: string[]) {
    let matchedKey: string[] = [];

    if (this.reveiwedResult) {
      KeyList.forEach(each => {
        // console.log(each)
        this.selectedKeyList.forEach((value, key) => {
          value.forEach(element => {
            if (element === each) {
              matchedKey.push(each)
            }
          })
        });
        // if(this.selectedKeyList.has(each)){
        //   console.log(each)
        //   matchedKey = each + ', '
        // }
      })
      // console.log(this.selectedKeyList, matchedKey, KeyList)
      if (matchedKey.length > 0) {
        this.tooltipText = 'Keywords of this document such as "' + matchedKey.join(', ') + '" match with the keywords of the previously selected documents.'
      }
      else {
        this.tooltipText = 'Keywords of this document do not match with the keywords of the previously selected documents.'
      }
    }

  }


  // onChange(docId: any, isChecked: any): void {
  //   // console.log(docId, isChecked.target.checked)
  //   if (this.allSelectedLabel == 'relevant') {
  //     this.releIrrevenatList.forEach((each) => {
  //       each.relevant = true
  //     }
  //     )
  //   }
  //   else if (this.allSelectedLabel == 'irrelevant') {
  //     this.releIrrevenatList.forEach((each) => {
  //       each.relevant = false
  //     })
  //   }
  //   this.noOfSelected = 0
  // }
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

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) { }
  panelOpenState = false;

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}