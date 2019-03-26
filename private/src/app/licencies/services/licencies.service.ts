import { IBanque } from './../models/data-licencies';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDataLicencies } from '../models/data-licencies';

@Injectable({
  providedIn: 'root'
})
export class LicenciesService {

  private url = '/api/private/tolicencies' ;

  constructor(private http: HttpClient) { }


  public  getBanques() {
    const url = this.url + '/banque' ;
    return this.http.get<IBanque[]>( url );
 }



  public  getdatas() {
     return this.http.get<IDataLicencies[]>( this.url );
  }


  public  add ( json ) {
    return this.http.post<IDataLicencies>( this.url , json );
  }

  public  update( json ) {
    return this.http.put<IDataLicencies>( this.url , json );
 }

 public  delete( id ) {
   const url = this.url + '/' + id ;
   return this.http.delete<any>( url  );
}

}
