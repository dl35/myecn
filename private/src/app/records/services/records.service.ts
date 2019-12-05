import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { IRecname } from '../models/models-recname';
import { IRecords } from '../models/models-records';
import {  of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/torecords' ;

    public  get() {
      return this.http.get<IRecords[]>( this.url );
    }



    public getReplace() {
      const url = this.url + '/replace';
      return this.http.get<any[]>( url );
    }

    public replace( data ) {
      const url = this.url + '/replace';
      return this.http.put<any[]>( url , data ).pipe(
        shareReplay(1)
        );
    }

 
    public getCompetitions() {
      const url = this.url + '/compet';
      return this.http.get<any[]>( url ).pipe(
        shareReplay()
        );
    }

    public traiteRecords( name ) {
      const url = this.url + '/traite/' + name;
      return this.http.get<any[]>( url );
    }

    public updateRecords( item , age ) {
      item.ageupdate = age ;
      const url = this.url ;
      return this.http.put<any[]>( url , item );
    }

    public insertRecords( item , age ) {
      item.ageupdate = age ;
      const url = this.url ;
      return this.http.post<any[]>( url , item );
    }

    public  put( data ) {
       return this.http.put<any>( this.url , data );
    }

    public  post( data ) {
      return this.http.post<any>( this.url , data );
    }


}