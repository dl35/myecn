import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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



  }

}
