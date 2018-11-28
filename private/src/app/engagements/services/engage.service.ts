import { CompetEngage, LicEngage } from './../models/data-engage';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EngageService {

  private subject$ = new BehaviorSubject<CompetEngage[]>([]) ;
  private datas$: Observable<CompetEngage[]> =  this.subject$.asObservable();
  private cache: CompetEngage[] = null;

/*
  private subjectLic$ = new BehaviorSubject<LicEngage[]>([]) ;
  private datasLic$: Observable<LicEngage[]> =  this.subjectLic$.asObservable();
*/
private datasLic$: Observable<LicEngage[]> ;

  private option = { present: true, absent: true };

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

  public sendMails( id ) {
    const uput = this.url + '/' + id ;
    const datas = { notifyall : true } ;
    return this.http.put<any>( uput , datas ) ;

  }

  public addLic( id ) {
    const uput = this.url + '/' + id ;
    const datas = { addlic : true } ;
    return this.http.put<any>( uput , datas ) ;

  }

  /*
  public getLicencies( id ) {
    const uget = this.url + '/' + id + '/lic';
    this.http.get<LicEngage[]>( uget ).subscribe(
      res => {  this.subjectLic$.next(res) ; }
    );
  }*/

  private getLicencies( id ) {
    const uget = this.url + '/' + id + '/lic';
    return this.http.get<LicEngage[]>( uget ) ;
  }



  public getLic( id ): Observable<LicEngage[]> {
    if (!this.datasLic$) {
      this.datasLic$ = this.getLicencies( id ).pipe(
        shareReplay( 1)
      );
      console.log( 'init' , id );
    }
    return this.datasLic$ ;
  }

  public reloadLic() {
    this.datasLic$ = null;
  }

  public licFilter( id , value ): Observable<LicEngage[]> {
    return this.getLic(id).pipe ( map( v =>  v.filter ( item =>  item.categorie === value  )  ) )   ;
    }


    public updateLicencies( id , datas ) {
      const uput = this.url + '/' + id ;
      datas.append = true ;
      return  this.http.post<any>( uput , datas );
    }



}
