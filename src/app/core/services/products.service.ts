import { Injectable } from "@angular/core";
import { generateRandomString } from "../../shared/utils";
import { Product } from "../../features/dashboard/products/models";
import { Observable, of } from "rxjs";

export let MY_DATABASE: Product[] = [
    {
        id: generateRandomString(4),
        name:'Pc gamer',
        price:900,
        categoryId:'dadwdawdwadw'
    },
    {
        id: generateRandomString(4),
        name:'PS5',
        price:1900,
        categoryId:'wdwdwdwdwd'

    }
    
]

@Injectable({ providedIn:'root'})
export class ProductsService{
    getProducts(): Observable<Product[]>{
        return of([...MY_DATABASE])
 
   }

   deleteById(id: string): Observable<Product[]>{
    MY_DATABASE=MY_DATABASE.filter((p)=>p.id !== id);
    return this.getProducts()
   }

   createProduct(data: Omit<Product,'id'>): Observable<Product[]>{
    MY_DATABASE.push({...data, id:generateRandomString(4)})
    return this.getProducts()
   }



}