import {  Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Category } from "../../features/dashboard/categories/models";
import { generateRandomString } from "../../shared/utils";

let  CATEGORIES_DB: Category[]=[
    {
        id: generateRandomString(4),
        name:'computacion',
        createdAt:new Date()
    },
    {
        id: generateRandomString(4),
        name:'Celulares',
        createdAt:new Date()
    },
    {
        id: generateRandomString(4),
        name:'Calzado',
        createdAt:new Date()
    },
]

@Injectable({ providedIn: 'root'})

export class CategoriesService{
    getCategories(): Observable<Category[]>{
        return of([...CATEGORIES_DB])

    }


createCategory(category: Omit<Category,'id' | 'createdAt'>): Observable<Category>{
    const categoryCreated={
        ...category,
        id: generateRandomString(4),
        createdAt: new Date()
    };
    
    CATEGORIES_DB.push(categoryCreated)
    return of(categoryCreated);

}

editCategory(id: string, category: Partial<Category>):Observable<Category>{

    const categoryToEdit = CATEGORIES_DB.find((cat)=> cat.id === id);

    if(!categoryToEdit){
        return throwError(()=> new Error('no se encontro la categoria'))
    }
    
    CATEGORIES_DB=CATEGORIES_DB.map((cat)=>
    cat.id === id ?{...categoryToEdit,...category}: cat
    )
    return of(categoryToEdit)




    }
}
    
   
