import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Observable, timer, pipe, of, BehaviorSubject } from 'rxjs';


export interface ICompetitions {

  id: number;
  nom: string;
  debut: string;
  fin: string;
  lieu: string;
  nb: number;
  next: boolean;

}

export interface IEngagements {

  nom: string;
  prenom: string;
  categorie: string;
  sexe: string;
  rang: string;
  eng: Array<IEng>;
}


interface IEng {
   day: string ;
   presence: string;
}

const REFRESH_INTERVAL = 10000 ;
const CACHE_SIZE = 1 ;

const maxAge = 10000;

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) {
   this.lastRead = Date.now() - 10000 ;
  }

  private url = '/api/public/tocompetitions';
  private cache$: Observable<Array<ICompetitions>>;
  private lastRead: number ;

  private subject  = new BehaviorSubject(new Array<ICompetitions>() ) ;
  public  subject$ = this.subject.asObservable();



  private  getCompetitions() {
     return this.http.get<Array<ICompetitions>>( this.url );
  }


  public getCachedCompetitions() {
    if (!this.cache$) {
      // Set up timer that ticks every X milliseconds
      const timer$ = timer(0, REFRESH_INTERVAL);

      // For each tick make an http request to fetch new data
      this.cache$ = timer$.pipe(
        switchMap(_ => this.getCompetitions()),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  public getCachedCompetitions2() {

    const isExpired =  ( this.lastRead < (Date.now() - maxAge)  );
    if ( isExpired ) {
      this.lastRead = Date.now() ;
      this.getCompetitions().subscribe(
          (datas)  =>   this.subject.next( datas )
      ) ;

    }

    return this.subject$;
  }



  public  getEngagements(id) {
    const url = this.url + '/' + id ;
    return this.http.get<Array<any>>( url );
 }

}
