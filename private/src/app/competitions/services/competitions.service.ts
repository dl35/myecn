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
  public datas$: Observable<DataCompet[]> =  this.subject$.asObservable();
  private cache: DataCompet[] = null;
  constructor(private http: HttpClient) {
      this.getListAll() ;

    console.log('created');
  }

  private url = '/api/private/competitions' ;

   private getListAll() {
          if ( !this.cache  ||  this.cache.length === 0 ) {
            this.http.get<DataCompet[]>( this.url )
            .subscribe(
              res => { this.cache = res ;  this.subject$.next(res) ; },
            );
     }
      }

    public getList() {
             return this.datas$ ;
    }


    public search(myfilter) {

      let liste: DataCompet[];
    if ( myfilter.verif && myfilter.verif === true ) {
       liste = this.cache.filter( item => item.verif === true );
    } else {
      liste = this.cache ;
    }

    if ( myfilter.txt && myfilter.txt.length > 0 ) {
      // tslint:disable-next-line:max-line-length
      liste = liste.filter( item =>   (item.nom.toLowerCase() + ' ' + item.lieu.toLowerCase() ) .indexOf( myfilter.txt.toLowerCase() ) !== -1   );
   }

      this.subject$.next( liste ) ;
      }

  public store(json) {
    if ( json.id == null ) {
        return this.post(json);
     } else {
       return this.put(json);
    }
  }
  private post(json) {
    delete json.id;
    this.http.post<DataCompet>( this.url , json ).subscribe(
      compet => { this.cache.push ( compet ) ;  this.subject$.next( this.cache ) ; },
    );
    }
  private put(json) {
    const url = this.url + '/' + json.id;
    this.http.put<DataCompet>( url , json ).subscribe(
      compet => { this.cache.push ( compet ) ;  this.subject$.next( this.cache ) ; },
    );
    }
  public delete(id) {

    const url = this.url + '/' + id;
    return  this.http.delete<MessageResponse>( url ) ;
      }
}
