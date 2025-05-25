import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent  implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'createdAt',
    'actions'
  ];
  dataSource:User[] = [];


  isloading = false

  usuario={
    nombre:'Seba',
    apellido:'Santiva'
  }



  constructor(private MatDialog:MatDialog,private usersService:UsersService ){}


  ngOnInit(): void {
    this.loadUsers()
    

  }

  
  loadUsers():void{
    this.isloading= true
    this.usersService.getUsers().subscribe({
      next:(users)=>{
        this.dataSource = users
      },
      error:()=>{
        this.isloading = false

      },
      complete:()=>{
        this.isloading = false
      }
      
    })
  }


  onDelete(id:string):void{
    if(confirm('Estas seguro?')){
      // this.dataSource= this.dataSource.filter((user)=> user.id !== id)
      this.isloading= true
      this.usersService.removeUserById(id).subscribe({
        next:(users)=>{
        this.dataSource = users
      },
      error:(err)=>{
        this.isloading= false

      },
      complete:()=>{
        this.isloading= false
      }
      })

    }
  }


  openModal(editingUser?: User):void{
    this.MatDialog
    .open(UserDialogComponent, {data:{editingUser,}})
    .afterClosed()
    .subscribe({
      next:(result)=>{
        console.log('recibimos',result)
        if(!!result){
          if(editingUser){
            this.handleUpdate(editingUser.id,result)

          }else{
            this.dataSource = [...this.dataSource,{...result,}]
          }
          // this.dataSource = [...this.dataSource, {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},]
        }
      }
    })
  }

  handleUpdate(id:string,update:User):void{
    this.isloading = true
    this.usersService.updateUserById(id,update).subscribe({
      next:(users)=>{
        this.dataSource = users
      },
      error:(err)=>{
        this.isloading= false

      },
      complete:()=>{
        this.isloading= false
      }
    })
  }

}
