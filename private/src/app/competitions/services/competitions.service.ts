import { BehaviorSubject, Observable } from 'rxjs';
import { DataCompet } from '../models/data-compet';
import { MessageResponse } from '../models/message-response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';



@Injectable(
{ providedIn: 'root'})
export class CompetitionsService {

  private subject$ = new BehaviorSubject<DataCompet[]>([]) ;
  public datas$: Observable<DataCompet[]> =  this.subject$.asObservable();
  private url = '/api/private/tocompetitions' ;
  private dataStore: Array<DataCompet>  = [];



  constructor(private http: HttpClient) {
   }


   public get( ) {
    this.http.get<DataCompet[]>( this.url ).subscribe(
      data => {  this.dataStore = data;  this.subject$.next( data ) ; },
    );
  }


    public getList() {

        return this.datas$ ;
    }


    public post( data ) {
      return this.http.post<DataCompet>(  this.url , data  ).subscribe( (d) => {
        this.dataStore.push ( d );
        this.subject$.next( this.dataStore ) ;
      }
      );
    }

    public put( data ) {
      const url = this.url + '/' + data.id;
      return this.http.put<DataCompet>(  url , data ).subscribe( (d) => {
        this.putCache( d );
        this.subject$.next( this.dataStore ) ;
      }
      );
    }
    private putCache( data ) {
      const index = this.dataStore.findIndex(item => item.id === data.id);
      this.dataStore[index] = data;
    }

    public delete( id ) {
      const url = this.url + '/' + id ;
      return this.http.delete<MessageResponse>(  url   ).subscribe(data => {
        this.deleteCache(id) ;
        this.subject$.next( this.dataStore ) ;
      } );
    }

    private deleteCache( id ) {
      this.dataStore = this.dataStore.filter(obj => obj.id !== id );
    }



      public getEnt() {
        const url = this.url + '/ent' ;
        return  this.http.get<any[]>( url ).pipe(
          shareReplay(1)
          ) ;
        }


}
