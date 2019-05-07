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




@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) {

  }

  private url = '/api/public/torecords';

  private cache = new BehaviorSubject(new Array<IRecords>() ) ;
  public subject$ = this.cache.asObservable();

  public start = true ;

  public  getRecords() {

      if ( this.start ) {
        this.http.get<Array<IRecords>>( this.url ).subscribe(
          (datas) => { this.cache.next( datas) ; this.start = false ; }
         );
      }
     return this.subject$;
  }





}
