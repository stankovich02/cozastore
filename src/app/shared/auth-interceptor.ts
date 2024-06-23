import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private authService : AuthService,private sharedService: SharedService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ withCredentials: true });
    return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            if(!document.cookie.includes('jwt') && document.cookie.includes('sessionExpired')){
              Swal.fire("Hey!", "Your session has expired. Please log in again!", "info").then((result) => {
                if (result.isConfirmed) {
                  this.authService.getLoggedInSubject().next(false); 
                  this.sharedService.triggerCallHeaderMethod(); 
                  this.router.navigate(['/login']);
                }
              })
              
            }
            else{
              Swal.fire("Hey!", "You are not authorized to do this action!", "error");
            }
          }
          return throwError(error);
        })
      );
  }
}
