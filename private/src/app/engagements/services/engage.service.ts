import { CompetEngage } from './../models/data-engage';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngageService {

  private subject$ = new BehaviorSubject<CompetEngage[]>([]) ;
  public datas$: Observable<CompetEngage[]> =  this.subject$.asObservable();
  private cache: CompetEngage[] = null;

  private url = '/api/private/engagements' ;

  constructor(private http: HttpClient) { }



  public getCompetNext() {
       //  if ( !this.cache  ||  this.cache.length === 0 ) {
           this.http.get<CompetEngage[]>( this.url )
           .subscribe(
             res => { this.cache = res ;    this.subject$.next(res) ; },
           );
  //  }
     }
}
