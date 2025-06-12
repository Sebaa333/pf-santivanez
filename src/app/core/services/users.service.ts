import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

let DATABASE: User[] = [
  {
    id:'dbv3Da',
    firstName:'seba',
    lastName: 'santiva',
    createdAt: new Date,
    email:'sebas@gmail.com',
    password:'123456',
    token: generateRandomString(20)
  }
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
   private baseURL =environment.apiBaseURL 

  constructor(private httpclient:HttpClient) { }


  getById(id: string): Observable<User | undefined>{
    return this.httpclient.get<User>(`${this.baseURL}/users/${id}`)

  }


  getUsers():Observable<User[]>{

    return this.httpclient.get<User[]>(`${this.baseURL}/users`)

  }

  removeUserById(id:string):Observable<User[]>{
    
    return this.httpclient.delete<User>(`${this.baseURL}/users/${id}`)
    .pipe(concatMap(()=>this.getUsers()))
  }

  createUser(data: Omit<User,'id'>):Observable<User>{
    return this.httpclient.post<User>(`${this.baseURL}/users`,{
      ...data,
      role: 'USER',
      password: generateRandomString(8),
      token: generateRandomString(20),
      createdAt: new Date().toISOString()})
  }



  updateUserById(id:string, update: Partial<User>){

    return this.httpclient.patch<User>(`${this.baseURL}/users/${id}`, update).pipe(concatMap(()=>this.getUsers()))





    // DATABASE =DATABASE.map((user)=>user.id === id? {...user,...update}:user)

    // return new Observable<User[]>((observer)=>{
    //   setInterval(() => {
    //     observer.next(DATABASE)
    //     observer.complete()
    //   }, 1000);
    // })
  }
}
