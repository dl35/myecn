import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MySnackBarService } from '../services/my-snack-bar.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {


    constructor(private router: Router, private snackBar: MySnackBarService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('token');

       if (token) {
            // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
       /* if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        } */
       request = request.clone({ headers: request.headers.set('Accept', 'application/json') });




        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {

/*
                console.log('UploadProgres: 1' ,  HttpEventType.UploadProgress );
                console.log('Response: 4' ,  HttpEventType.Response );
                console.log('ResponseHeader: 2' ,  HttpEventType.ResponseHeader );
                console.log('Sent: 0' ,  HttpEventType.Sent );
                console.log('User: 5 ' ,  HttpEventType.User );
*/


                if (event instanceof HttpResponse) {
                    const text = (event.body.message) ? event.body.message : event.statusText;

                    this.snackBar.showSnackBar(text, false);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse) {

                    if (error.status === 401) {
                        this.snackBar.showSnackBar(error.statusText + ': ' + error.status, true);
                        this.router.navigate(['/login']);
                    } else {
                        const text = (error.error.message) ? error.error.message : error.statusText;
                        this.snackBar.showSnackBar(text, true);
                    }
                    return throwError(error);
                }
            })
        );
    } // intercept
}
