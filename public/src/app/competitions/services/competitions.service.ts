import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export class Cdatas {

  compet: ICompetitions ;
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
   day: string ;
   presence: string;
}


const maxAge = 10000;

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  constructor(private http: HttpClient) {
   this.lastRead = Date.now() - 10000 ;
  }

  private url = '/api/public/tocompetitions';
  // private cache$: Observable<Array<ICompetitions>>;
  private lastRead: number ;

  private subject  = new BehaviorSubject(new Array<ICompetitions>() ) ;
  public  subject$ = this.subject.asObservable();



  public engageCached: Array<IEngagements> = [] ;
  private engage  = new BehaviorSubject(new Array<IEngagements>() ) ;
  public  engages$ = this.engage.asObservable();

  // private compet  = new BehaviorSubject(new ICompetitions() ) ;
  // public  compet$ = this.compet.asObservable();

  private _compet: ICompetitions ;

  set compet( c: ICompetitions )  {
    this._compet = c;
  }

  get compet() {
    return this._compet ;
  }


  public  getCompetitions() {
     return this.http.get<Array<ICompetitions>>( this.url );
  }

  public  getEngagements(id) {
    const url = this.url + '/' + id ;
    return this.http.get<Array<IEngagements>>( url ) ;
    }


/*
  public  getEngagements2(id) {
    this.engageCached = [] ;
    const url = this.url + '/' + id ;
    this.http.get<Cdatas>( url ).subscribe(
      (d) =>  { this.engageCached = d.engage ;  this.compet.next(d.compet) ; this.engage.next(d.engage) }
    );
    }
*/

    public doFilter( f ) {

       const r = this.engageCached.filter(
        ( d ) => this.myfilter(d.eng , f )
        );
      this.engage.next (r );



    }

    myfilter( e , f ) {
      let res = false;
      e.forEach( c => {
         if ( f.pre &&  c.presence === 'oui'  ) {
              res = true ;
         }
         if ( f.abs &&  c.presence === 'non'  ) {
          res = true ;
        }
        if ( f.att  &&  c.presence === 'at'  ) {
          res = true ;
        }
      });
    return   res  ;
    }

 }





