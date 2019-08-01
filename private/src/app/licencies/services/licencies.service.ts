import { IBanque, ICarte } from './../models/data-licencies';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDataLicencies } from '../models/data-licencies';

@Injectable({
  providedIn: 'root'
})
export class LicenciesService {

  private url = '/api/private/tolicencies' ;
  public item: IDataLicencies ;
  public name: string;

  constructor(private http: HttpClient) { }


  public  getBanques() {
    return this.http.get<IBanque[]>('./assets/datas/banques.json');
 }

 public  getCartes() {
  return this.http.get<ICarte[]>('./assets/datas/cartes.json');
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

public attest(id ){
  const url = '/api/private/toattest' + '/' + id ;
  return this.http.get<any>( url  );
}


}
