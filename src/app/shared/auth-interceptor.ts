import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({ withCredentials: true });
    return next.handle(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            Swal.fire("Oops!", "You are not authorized for this!", "error");
          }
          return throwError(error);
        })
      );
  }
}
