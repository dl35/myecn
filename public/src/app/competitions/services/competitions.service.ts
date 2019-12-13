import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class Cdatas {
  compet: ICompetitions;
  engage: Array<IEngagements>;
}

export class ICompetitions {
  id: number;
  nom: string;
  debut: string;
  fin: string;
  lieu: string;
  nb: number;
  next: boolean;
}

export class IEngagements {
  nom: string;
  prenom: string;
  categorie: string;
  sexe: string;
  rang: string;
  eng: Array<IEng>;
}


interface IEng {
  day: string;
  presence: string;
}


@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {
  private url = '/api/public/tocompetitions';

  constructor(private http: HttpClient) {
  }

  private subject = new BehaviorSubject(new Array<ICompetitions>());
  public subject$ = this.subject.asObservable();

  private engage = new BehaviorSubject(new Array<IEngagements>());

  private _compet: ICompetitions;

  set compet(c: ICompetitions) {
    this._compet = c;
  }

  get compet() {
    return this._compet;
  }

  public getCompetitions() {
    return this.http.get<Array<ICompetitions>>(this.url);
  }

  public getEngagements(id) {
    const url = this.url + '/' + id;
    this.http.get<Array<IEngagements>>(url).subscribe(
      (v) => { this.engage.next(v); }
    );
  }

  public getEngagementsObs() {
    return this.engage.asObservable();
  }


}





