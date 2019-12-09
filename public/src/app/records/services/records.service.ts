import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
type: 'CLUB' | 'DEP' | 'REG' | 'FRA';
}



@Injectable({
  providedIn: 'root'
})
export class RecordsService {


  private url = '/api/public/torecords';
  constructor(private http: HttpClient) {
  }

  public  getRecords() {
   return    this.http.get<Array<IRecords>>( this.url ) ;
  }



}
