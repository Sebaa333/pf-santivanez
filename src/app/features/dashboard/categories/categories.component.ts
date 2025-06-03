import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  
  categories: Category[]=[]
  categoryForm: FormGroup;


  constructor( private categoriesService: CategoriesService,
    private fb: FormBuilder,
  ){
    this.categoryForm=this.fb.group({
      name:['',Validators.required]
    })
  }
  
  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories():void{
    this.categoriesService.getCategories().subscribe({
      next:(categories)=>{
        this.categories =categories

      }
    })
  }
  onCreated(): void{
    if(this.categoryForm.invalid){
      this.categoryForm.markAllAsTouched()
    }else{
      this.categoriesService.createCategory(this.categoryForm.value).subscribe({
        next:(categoryCreated)=>{
          this.categories =[...this.categories, categoryCreated]
          this.categoryForm.reset()
        }
      })
    }
  }
  onEdit(category: Category):void{
    this.categoryForm.patchValue({ name: category.name })
    // this.categoriesService.editCategory(id, this.categoryForm.value).subscribe({
    //   next:()=> this.loadCategories()
    // })

  }
}
