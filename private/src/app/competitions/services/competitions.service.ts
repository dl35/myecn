import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { DataCompet } from '../models/data-compet';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, shareReplay, publishReplay, filter, tap, catchError } from 'rxjs/operators';


export interface MessageResponse {
  success: boolean;
  message: string;
  }

@Injectable(
{ providedIn: 'root'})
export class CompetitionsService {

  private subject$ = new BehaviorSubject<DataCompet[]>([]) ;
  public datas$: Observable<DataCompet[]> = this.subject$.asObservable();

  subjectError$: BehaviorSubject<Error> = new BehaviorSubject<Error>(null);
  public errorMessage$: Observable<Error> = this.subjectError$.asObservable();

  // datas$: Observable<DataCompet[]> ;
 //  datas$: Observable<DataCompet[]> = this.subject$.asObservable;
  private competList: DataCompet[] = null;
  constructor(private http: HttpClient) {
    console.log('created');
  }

  private url = '/api/private/competitions' ;


    private list() {
          if ( !this.competList  ||  this.competList.length === 0 ) {
            this.http.get<DataCompet[]>( this.url )
            .pipe( catchError( error => throwError( error ) ))
            .subscribe(
              res => {  this.competList = res ;  this.subject$.next(res) ; },
            //  error => {  throw(error)  }
            );
     }

      }



    public getList() {

            this.list();
            return this.datas$;
    }


    public search(myfilter) {

      let liste: DataCompet[];
    if ( myfilter.verif && myfilter.verif === true ) {
       liste = this.competList.filter( item => item.verif === true );
    } else {
      liste = this.competList ;
    }

    if ( myfilter.txt && myfilter.txt.length > 0 ) {
      // tslint:disable-next-line:max-line-length
      liste = liste.filter( item =>   (item.nom.toLowerCase() + ' ' + item.lieu.toLowerCase() ) .indexOf( myfilter.txt.toLowerCase() ) !== -1   );
   }



      this.subject$.next( liste ) ;
      }

     /* getTest(): Observable<DataCompet> {
        return this.getList().pipe(
            map( datas => datas.find(item => item.verif === true))
        ).;
    }*/


 /* private list() {
         this.http.get<DataCompet[]>( this.url ).subscribe(
             res => {console.log(res) ; this.subject$.next(res) ; }) ;
             this.datas$ = this.subject$.asObservable();
             return this.datas$ ;
         }

  public getList() {

            if (  this.datas$ === null  ) {
              return  this.list();
            } else  {
              return this.datas$ ;
            }


  } */  

/*
  private list() {
      return this.http.get<DataCompet[]>( this.url ).pipe(
        map(res => res ));
    }

public getList() {

       if (  !this.datas$   ) {
        this.datas$ = this.list().pipe( shareReplay(1) );
       } 
       return this.datas$ ;
 } */




  public store(json) {
    if ( json.id == null ) {
        return this.post(json);
     } else {
       return this.put(json);
    }
  }
  private post(json) {
     return  this.http.post( this.url , json ) ;
    }
  private put(json) {
    const url = this.url + '/' + json.id;
    return  this.http.put<MessageResponse>( url , json ) ;
    }
  public delete(id) {

    const url = this.url + '/' + id;
    return  this.http.delete<MessageResponse>( url ) ;
      }
}
