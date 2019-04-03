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
  private cache: DataCompet[] = null;


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
          if ( !this.cache  ||  this.cache.length === 0 ) {
            this.http.get<DataCompet[]>( this.url ).pipe( shareReplay(1) )
            .subscribe(
              res => { this.cache = res ;  this.update(); },
            );
     }
      }

    public getList() {
             return this.datas$ ;
    }


    public setFiltre( filtre ) {
        this.filtre = filtre ;
    }


    public update() {

      let liste: DataCompet[];
      if (this.filtre.verif === true) {
        liste = this.cache.filter(item => item.verif === true);
      } else if (this.filtre.verif === false ) {
        liste = this.cache.filter(item => item.verif === false);
      } else {
        liste = this.cache;
        console.log('ici' , this.filtre , liste.length  );

      }

      if (this.filtre.type === true) {
        liste = liste.filter(item => item.type === 'compet');
      } else if (this.filtre.type === false) {
        liste = liste.filter(item => item.type === 'stage');
      }

      if (this.filtre.next === true) {
        liste = liste.filter(item => item.next === true);
      } else if (this.filtre.next === false) {
        liste = liste.filter(item => item.next === false);
      }

      if ( this.filtre.txt && this.filtre.txt.length > 0 ) {
        // tslint:disable-next-line:max-line-length
        liste = liste.filter( item =>   (item.nom.toLowerCase() + ' ' + item.lieu.toLowerCase() ) .indexOf( this.filtre.txt.toLowerCase() ) !== -1   );
     }
     console.log('la' , this.filtre , liste.length  );


      this.subject$.next( liste ) ;

     }



    public post(json) {
      return this.http.post<DataCompet>( this.url , json );
    }
    public put(json) {
      const url = this.url + '/' + json.id;
      return this.http.put<DataCompet>( url , json );
    }
    public updateCache( method: string ,  compet: DataCompet ) {
      if ( method === 'post' ) {
        this.cache.unshift ( compet );
      } else  if ( method === 'put' )  {
        const index = this.cache.findIndex(item => item.id === compet.id);
        this.cache[index] = compet;
      } else {
        this.cache = this.cache.filter(obj => obj.id !== compet.id );
      }

      this.update();

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
