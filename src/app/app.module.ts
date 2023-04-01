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
import { RouterModule, Routes } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner' 
import { MatProgressBarModule } from '@angular/material/progress-bar' 
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import { SpinnerComponent } from './spinner/spinner.component';
import { CustomHttpInterceptorService } from './custom-http-interceptor.service';
import { MatButtonModule } from '@angular/material/button';
import { HighlightQueryPipe } from './new-search/highlightQuery';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { HighlightComponent } from './highlight/highlight.component';

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
    HighlightQueryPipe,
    HighlightComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    NgbAlertModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule, 
    MatChipsModule,
    MatIconModule, 
    MatBadgeModule
  ],
  exports: [RouterModule],
  providers: [
  NewSearchService ,{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptorService,
    multi: true
  }, HighlightQueryPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
