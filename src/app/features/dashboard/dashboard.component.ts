import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from './users/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  authUser$: Observable<User | null>


  
  constructor(private router: Router,private authService: AuthService){
    this.authUser$ = authService.authUser$
  }

  logout():void{
    this.authService.logout()
  }
}
