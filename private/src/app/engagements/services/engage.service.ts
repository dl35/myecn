import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CompetEngage, LicEngage } from './../models/data-engage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, publishReplay, refCount } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EngageService {


  private url = '/api/private/toengagements' ;


  private subject$ = new BehaviorSubject<LicEngage[]>([]) ;
  private subCompet$ = new Subject<CompetEngage[]>() ;


  constructor(private http: HttpClient) { }




  public  getCompet() {
        this.http.get<CompetEngage[]>( this.url ).subscribe(
          res => {   this.subCompet$.next( res ) ; },
        );
     }
     public getObsCompet() {
      return this.subCompet$.asObservable();
  }



  public createEngagement( id , data ) {
    const upost = this.url + '/' + id ;
    return this.http.post<any>( upost , data  ) ;

  }





  public getEngagement( id ) {


    const uget = this.url + '/' + id ;
    this.http.get<any[]>( uget  ).subscribe(
      res =>   { this.subject$.next( res ) ;  }

    ) ;
  }
  public getData() {
    return this.subject$.asObservable();
}

public clearData() {
  this.subject$.next( [] ) ;
}


  public sendMails( id ) {
    const uput = this.url + '/' + id ;
    const datas = { notifyall : true } ;
    this.http.put<any>( uput , datas ).subscribe(

      (res ) => {   /*   const v =  this.subject$.value ; v.forEach( e  =>  e.notification =  1 + e.notification );
                       this.subject$.next( v ) ; */
                       this.getEngagement(id);
                   }

   ) ;

  }
  public setExtranat( id, idext ) {
    const uput = this.url + '/' + id ;
    const data = { extranat : idext } ;
    this.http.put<any>( uput , data  ).subscribe(

       (res ) => { const v =  this.subject$.value ;  const index = v.findIndex( x =>  x.id === idext  ) ;
                           v[index].extranat =  1 - v[index].extranat ;
                           this.subject$.next( v ) ;
                    }

    ) ;
  }
  public setNotification( id, idext ) {
    const uput = this.url + '/' + id ;
    const data = { notify : idext } ;
    this.http.put<any>( uput , data  ).subscribe(
      (res ) => { const v =  this.subject$.value ;  const index = v.findIndex( x =>  x.id === idext  ) ;
        v[index].notification =  1 + +v[index].notification ;
        this.subject$.next( v ) ;
      }
     );
  }
  public setDelete( iddel ) {
    const uput = this.url + '/' + iddel ;
    this.http.delete<any>( uput).subscribe(
      (res ) => { const v =  this.subject$.value ;  const index = v.findIndex( x =>  x.id === iddel  ) ;
        v.splice(index, 1);
        this.subject$.next( v ) ;
      }
     );
  }

  public setDeleteAll(idcompet) {
    const udel = this.url + '/all_' + idcompet ;
    this.http.delete<any>( udel).subscribe(
      (res ) => { const v =  this.subject$.value.filter( x =>  x.notification > 0  ) ;
                  this.subject$.next( v ) ;
      }
     );
  }





  public addLic( id ) {
    const uput = this.url + '/' + id ;
    const datas = { addlic : true } ;
    this.http.put<any>( uput , datas ).subscribe(
      (res ) => { const v =  this.subject$.value ;
        v.push(res);
        this.subject$.next( v ) ;
      }
     );

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

  public modifLicencies( id , datas ) {
    const uput = this.url + '/' + id ;
    datas.modif = true ;
    return  this.http.put<any>( uput , datas );
    }


}
