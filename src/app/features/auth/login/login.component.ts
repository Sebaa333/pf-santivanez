import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordInputType: 'password' | 'text' ='password'
  
  
  loginForm: FormGroup;



  constructor(
     private formBuilder:FormBuilder,
     private authService: AuthService,
     private router:Router
    ){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',Validators.required],
    })
  }


  togglePasswordInputType():void{
    if(this.passwordInputType ==='password'){
      this.passwordInputType ='text'
    }else{
      this.passwordInputType = 'password'
    }
  }


  onSubmit():void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
      this.authService.login(this.loginForm.value).subscribe({
        next:(result)=>{
          console.log(result)
          this.router.navigate(['dashboard','home'])
        },
        error:(err)=>{
          console.log(err)
          if(err instanceof Error){
            alert(err.message)
          }

          if(err instanceof HttpErrorResponse){
            if (err.status === 0){
              alert('no se conecto con el servidor')
            }
            
          }


        }
      })

    }
  }

}
