import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesDetailComponent } from './categories-detail/categories-detail.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesDetailComponent,
    CategoriesTableComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
