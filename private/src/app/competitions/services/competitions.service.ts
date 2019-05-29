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
//  private cache: DataCompet[] = null;


  private messageData = new BehaviorSubject<DataCompet>(null);
  public currentDatas$ = this.messageData.asObservable();


  filtre = { next: true, type: null, verif: null, txt: '' };

  constructor(private http: HttpClient) {
     // this.getListAll() ;

  }




  private url = '/api/private/tocompetitions' ;



  public setMessageData(data: DataCompet) {
    this.messageData.next( data ) ;
  }




  public getListAll() {

            this.http.get<DataCompet[]>( this.url ).pipe( shareReplay(1) )
            .subscribe(
              res => {   this.subject$.next( res ) ; },
            );

      }

    public getList() {
             return this.datas$ ;
    }


    public setFiltre( filtre ) {
        this.filtre = filtre ;
    }


    public post(json) {
      return this.http.post<DataCompet>( this.url , json );
    }
    public put(json) {
      const url = this.url + '/' + json.id;
      return this.http.put<DataCompet>( url , json );
    }

  
    public delete(id) {
      const url = this.url + '/' + id;
      return  this.http.delete<MessageResponse>( url ) ;
      }

      public getEnt() {
        const url = this.url + '/ent' ;
        return  this.http.get<any[]>( url ).pipe(
          shareReplay(1)
          ) ;
        }


}
