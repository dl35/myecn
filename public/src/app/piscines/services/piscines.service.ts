import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PiscinesService {

  constructor(private http: HttpClient) { }

  private url = '/api/public/topiscines' ;

  public  getdatas( bbox ) {
    const d = {'bbox' : bbox } ;
    return this.http.post<any>( this.url , d );
  }

}

