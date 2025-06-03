import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path:':id',
    component: CategoriesDetailComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
