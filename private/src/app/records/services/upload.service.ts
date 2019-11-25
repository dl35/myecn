import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = '/api/private/torecords/upload' ;

  constructor(private http: HttpClient) {}


  public upload( fd: FormData )  {

     return  this.http.post( this.url , fd  ,  {
       reportProgress: true ,
       observe: 'events'
      } ) ;

   /*   .pipe(map((event) => {

        switch (event.type) {

          case HttpEventType.UploadProgress:
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };

          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })*/




  }

}
