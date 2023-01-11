import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewSearchComponent } from './new-search/new-search.component';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewSearchService } from './new-search/new-search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HighlightSearchPipe } from './new-search/highlightPipe';
import { HighlightDirective } from './highlight.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner' 
import { MatProgressBarModule } from '@angular/material/progress-bar' 
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';

import { SpinnerComponent } from './spinner/spinner.component';
import { CustomHttpInterceptorService } from './custom-http-interceptor.service';
import { MatButtonModule } from '@angular/material/button';


const appRoutes: Routes = [
  { path: '', component: NewSearchComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HighlightSearchPipe,
    NewSearchComponent,
    HighlightDirective,
    SpinnerComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgbAlertModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule
  ],
  exports: [RouterModule],
  providers: [
  NewSearchService ,{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
