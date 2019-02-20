import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LicenciesService {

  private url = '/api/private/tolicencies' ;

  constructor(private http: HttpClient) { }



  public  getdatas() {
    //  from , dests, compet
     return this.http.get<any>( this.url );
  }


}
