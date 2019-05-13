import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';



export interface IRecords {
age: string;
bassin: '25' | '50' ;
date: string ;
distance: string;
lieu: string;
modif: string;
nage: string;
nom: string;
points: number;
prenom: string;
sexe: 'F' | 'H' ;
temps: number;
type: 'CLUB' | 'DEP' | 'REG' | 'NAT';
}

const maxAge = 60000;


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private lastRead: number ;
  private url = '/api/public/torecords';
  private cache = new BehaviorSubject(new Array<IRecords>() ) ;


  public subject$ = this.cache.asObservable();
  constructor(private http: HttpClient) {
    this.lastRead = Date.now() - maxAge ;
  }


  public  getRecords() {
    const isExpired =  ( this.lastRead < (Date.now() - maxAge)  );
      if ( isExpired ) {
        this.lastRead = Date.now() ;
        this.http.get<Array<IRecords>>( this.url ).subscribe(
          (datas) => { this.cache.next( datas); }
         );
      }
     return this.subject$;
  }





}
