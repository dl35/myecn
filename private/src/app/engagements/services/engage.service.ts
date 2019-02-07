import { BehaviorSubject, Observable } from 'rxjs';
import { CompetEngage, LicEngage } from './../models/data-engage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, publishReplay, refCount } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EngageService {


  private url = '/api/private/toengagements' ;

  constructor(private http: HttpClient) { }




  public  getCompet() {
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
  public setExtranat( id, idext ) {
    const uput = this.url + '/' + id ;
    const data = { extranat : idext } ;
    return this.http.put<any>( uput , data  ) ;
  }
  public setNotification( id, idext ) {
    const uput = this.url + '/' + id ;
    const data = { notify : idext } ;
    return this.http.put<any>( uput , data  ) ;
  }
  public setDelete( iddel ) {
    const uput = this.url + '/' + iddel ;
    return this.http.delete<any>( uput) ;
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



    public updateLicencies( id , datas ) {
      const uput = this.url + '/' + id ;
      datas.append = true ;
      return  this.http.post<any>( uput , datas );
    }



}
