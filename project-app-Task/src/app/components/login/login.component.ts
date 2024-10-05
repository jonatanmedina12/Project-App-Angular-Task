import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hidePassword = true;

  loginForm!:FormGroup;

  constructor(private fb :FormBuilder,private authService:AuthService,private router:Router, private snackbar:MatSnackBar){
    this.loginForm =this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })

  }
  onSubmit(){
    if (this.loginForm.valid){
      const {username , password }= this.loginForm.value;
      this.authService.login({username,password}
       
      ).subscribe({
        next:()=>{
            this.router.navigate([''])
            this.snackbar.open("Login exitoso",'close',{duration:3000});
        },
        error:(error)=>{
          console.error('login error',error);
          this.snackbar.open('error al iniciar sesión intente nuevamente','close',{duration:3000});
        }
        
      })
    }
  }
}
