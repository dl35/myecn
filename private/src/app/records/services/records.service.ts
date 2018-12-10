import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/records' ;

  public  getDatas() {
    //  from , dests, compet
     return this.http.get<any>( this.url );
  }


}