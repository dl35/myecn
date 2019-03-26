import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = '/api/private/torecords/upload' ;

  constructor(private http: HttpClient) {}


  public upload( file: FormData )  {
console.log( file ) ;
     return  this.http.post( this.url , file , {
       reportProgress: true ,
       observe: 'events'
      } ) ;



  }

}
