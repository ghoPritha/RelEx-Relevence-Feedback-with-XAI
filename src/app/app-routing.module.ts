import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSearchComponent } from './new-search/new-search.component';
import { SearchPageComponent } from './search-page/search-page.component';

const appRoutes: Routes = [
  {path: '', component: NewSearchComponent},
  {path: 'example', component: NewSearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
