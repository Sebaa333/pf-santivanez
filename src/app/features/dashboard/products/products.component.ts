import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Observable } from 'rxjs';
import { Product } from './models';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../categories/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products$: Observable<Product[]>
  categories$: Observable<Category[]>

  productForm:FormGroup;



  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ){
    
    this.products$ = this.productService.getProducts()
    this.categories$ = this.categoriesService.getCategories()

    this.productForm =this.formBuilder.group({
      name:[],
      price:[],
      categoryId:[],
    })
  }

  onSubmit(): void{
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched()
    }else{
      console.log(this.productForm.value)
      this.products$  = this.productService.createProduct(this.productForm.value)
    }
  }



}
