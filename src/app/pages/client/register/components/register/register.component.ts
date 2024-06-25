import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private http: HttpClient, private authService: AuthService, private router: Router){}
  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/home']);
    }
  }
  protected validForm: boolean = false;
  protected user: any = {
    username : '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  };
  protected errors: any = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  };
  registerUser() {
    {
      this.http.post<HttpResponse<any>>('http://localhost:5001/api/users', 
        {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          username: this.user.username,
          password: this.user.password,
          email: this.user.email
        }, 
        { observe: 'response' }
      ).subscribe(
        response => {
          if (response.status === 201) {
            this.validForm = true;
            this.user = {
              username : '',
              password: '',
              email: '',
              firstName: '',
              lastName: ''
            };
            this.errors = {
              username: '',
              password: '',
              email: '',
              firstName: '',
              lastName: ''
            };
            setTimeout(() => {
              this.validForm = false;
            }, 2000);
          }
        },
        error => {
          if (error.status === 422) {
            this.errors = {
              username: '',
              password: '',
              email: '',
              firstName: '',
              lastName: ''
            };
            error.error.forEach(element => {
              switch (element.property) {
                case 'Email':
                  this.errors.email = element.error;
                  break;
                case 'Username':
                  this.errors.username = element.error;
                  break;
                case 'Password':
                  this.errors.password = element.error;
                  break;
                case 'FirstName':
                  this.errors.firstName = element.error;
                  break;
                case 'LastName':
                  this.errors.lastName = element.error;
                  break;
              }
            });
          }
          this.validForm = false;
        }
      );
      
    }
  }
}
