import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';


export interface ICompetitions {

  id: number;
  label: string;
}

export interface IEngagements {

  id_licencies?: string;
  nom: string;
  prenom: string;
  categorie: string;
  sexe: string;
  rang: string;
  eng: IEng;
}


interface IEng {
   day: string ;
   presence: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) { }

  private url = '/api/public/competitions';

  public  getCompetitions() {
     return this.http.get<Array<ICompetitions>>( this.url ).pipe(shareReplay(1));
  }

  public  getEngagements(id) {
    const url = this.url + '/' + id ;
    return this.http.get<Array<IEngagements>>( url ).pipe(shareReplay(1));
 }

}
