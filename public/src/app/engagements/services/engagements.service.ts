import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface IResponse {

  success: boolean;
  message: string;
}





@Injectable({
  providedIn: 'root'
})
export class EngagementsService {

  private url = '/api/public/toengagements' ;

  constructor(private http: HttpClient) { }


public getEngagements(ide , idl ) {
    const url = this.url + '/' + ide + '/' + idl ;
    return this.http.get( url ) ;
}

public updateEngagements(ide , idl, datas ) {
  const url = this.url + '/' + ide + '/' + idl ;
  return this.http.put<IResponse>( url , datas ) ;
}


}
