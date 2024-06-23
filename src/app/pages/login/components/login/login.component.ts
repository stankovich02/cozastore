import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { AuthResponse } from '../../../../core/models/object-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService : AuthService,private router: Router){}
  protected email: string = 'testtest@gmail.com';
  protected password: string = 'Test1234';
  protected error : string | void = '';

  login() {
    this.authService.login({ email: this.email, password: this.password } ).subscribe({
      next: (response: HttpResponse<AuthResponse>) => {
        if (response.status === 200) {
          this.error = '';
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        if (err.status === 409) {
          this.error = err.error.error;  
        }
      }
    });
  }
}