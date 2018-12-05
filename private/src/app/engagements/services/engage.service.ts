import { CompetEngage, LicEngage } from './../models/data-engage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class EngageService {


  private option = { present: true, absent: true };

  private url = '/api/private/engagements' ;

  constructor(private http: HttpClient) { }


  public  getCompet() {
       //  if ( !this.cache  ||  this.cache.length === 0 ) {
        return this.http.get<CompetEngage[]>( this.url );
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


  public getLicencies( id ) {
    const uget = this.url + '/' + id + '/lic';
    return this.http.get<LicEngage[]>( uget ) ;
  }


/*
  public getLic( id ): Observable<LicEngage[]> {
        this.datasLic$ = this.getLicencies( id ).pipe(
        shareReplay( 1)
      );
      console.log( 'init' , id );
    }
    return this.datasLic$ ;
  }
*/





    public updateLicencies( id , datas ) {
      const uput = this.url + '/' + id ;
      datas.append = true ;
      return  this.http.post<any>( uput , datas );
    }



}
