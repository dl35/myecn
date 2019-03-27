import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = '/api/private/torecords/upload' ;

  constructor(private http: HttpClient) {}


  public upload( fd: FormData )  {

    const headers = new HttpHeaders();
    //headers.set('Content-Type', null );
    headers.set('Content-Type' , 'multipart/form-data');
     return  this.http.post( this.url , fd  ,  {
       headers : headers ,
       reportProgress: true ,
       observe: 'events'

      } ) ;

  }

}
