import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MySnackBarService } from '../services/my-snack-bar.service';

@Injectable()


export class HttpConfigInterceptor implements HttpInterceptor {


    constructor(private router: Router,private snackBar: MySnackBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('token');

        if (token) {
            // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            request = request.clone({ headers: request.headers.set('Authorization', token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle( request ).pipe(
            map( (event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
               return event ;
            }),
            catchError( (error: HttpErrorResponse  ) => {
                if (error instanceof HttpErrorResponse) {
                    console.log('error') ;
                    if (error.status === 401) {
                    this.snackBar.showSnackBar(error.statusText + ': ' + error.status, true ) ;
                      this.router.navigate(['/login']);
                    } else {
                   //   this.snack.open('Communication error: ' + err.status + ' - ' + err.statusText, null,
                   //    {duration: 5000, panelClass: 'snack-error', verticalPosition: 'top'});
                    }
                return throwError(error);
            }} )
        );
      } // intercept
  }
