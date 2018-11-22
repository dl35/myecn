import { CompetEngage } from './../models/data-engage';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngageService {

  private subject$ = new BehaviorSubject<CompetEngage[]>([]) ;
  private datas$: Observable<CompetEngage[]> =  this.subject$.asObservable();
  private cache: CompetEngage[] = null;

  private url = '/api/private/engagements' ;

  constructor(private http: HttpClient) { }


  public  getCompetNext() {
       //  if ( !this.cache  ||  this.cache.length === 0 ) {
        this.http.get<CompetEngage[]>( this.url ).subscribe(
             res => { this.cache = res ;   this.subject$.next(res) ; },
           );
     }

  public getCompet() {
    return this.datas$ ;
  }

  public createEngagement( id , data ) {
    const upost = this.url + '/' + id ;
    return this.http.post<any>( upost , data  ) ;

  }

  public getEngagement( id ) {
    const uget = this.url + '/' + id ;
    return this.http.get<any[]>( uget  ) ;

  }

}
