import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PiscinesService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/topiscines' ;

  public  post( data ) {
    return this.http.post<any>( this.url , data );
  }

  public  put( data , id ) {
    const url = this.url + '/' + id ;
    return this.http.put<any>( url , data );
  }

  public  get( id ) {
    const url = this.url + '/' + id ;
    return this.http.get<any>( url );
  }

  public  delete( id ) {
    const url = this.url + '/' + id ;
    return this.http.delete<any>( url );
  }


  public  getdatas( bbox ) {
    const d = {'bbox' : bbox } ;
    return this.http.post<any>( this.url , d );
  }




}
