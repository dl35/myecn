import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iniveau } from './Iniveau';


@Injectable({
  providedIn: 'root'
})

export class NiveauService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/toniveau' ;

  public  get() {
       return this.http.get<Array<Iniveau>>( this.url );
  }

  public  put( datas: Iniveau ) {
       return this.http.put<Iniveau>( this.url , datas );
  }


}


