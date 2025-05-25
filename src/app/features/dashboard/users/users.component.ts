import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { User } from './models';




const ELEMENT_DATA: User[] = [
  {
    id:'dbv3Da',
    firstName:'goku',
    lastName: 'songoku',
    createdAt: new Date,
    email:'gokussj@gmail.com',
  }
];

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})


export class UsersComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'createdAt',
    'actions'
  ];
  dataSource = ELEMENT_DATA;

  usuario={
    nombre:'Seba',
    apellido:'Santiva'
  }



  constructor(private MatDialog:MatDialog ){}

  openModal():void{
    this.MatDialog.open(UserDialogComponent)
    .afterClosed()
    .subscribe({
      next:(result)=>{
        console.log('recibimos',result)
        if(!!result){
          // this.dataSource = [...this.dataSource, {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},]
        }
      }
    })
  }

}
