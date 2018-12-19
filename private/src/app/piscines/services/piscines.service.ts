import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PiscinesService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/piscines' ;

  public  getdatas() {
    //  from , dests, compet
     return this.http.get<any>( this.url );
  }



}
