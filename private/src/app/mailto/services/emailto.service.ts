import { IMailto } from './../models/mailto-models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailtoService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/tomailto' ;

  public  getdatas() {
    //  from , dests, compet
     return this.http.get<IMailto>( this.url );
  }

  public  sendMail( datas ) {
    //  from , dests, compet
     return this.http.post<any>( this.url , datas );
  }


}
