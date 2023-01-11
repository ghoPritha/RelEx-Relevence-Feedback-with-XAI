import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSearchComponent } from './new-search/new-search.component';

const appRoutes: Routes = [
  {path: '', component: NewSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
