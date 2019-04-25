import { ILogin } from './../models/iLogin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { constructor } from 'q';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  datas$: Observable<ILogin[]>;
  private subject: BehaviorSubject<ILogin[]>;
  private url: string;
  private dataStore: Array<ILogin> ;


  constructor(private http: HttpClient) {
      this.url = '/api/private/tologin' ;
      this.dataStore = [] ;
      this.subject = <BehaviorSubject<ILogin[]>>new BehaviorSubject([]);
      this.datas$ = this.subject.asObservable();
   }

  public get( ) {
    this.http.get<ILogin[]>( this.url ).subscribe(data => {
      this.dataStore = data;
      this.subject.next( data ) ;
    }
    );
  }



  public put( data ) {
    return this.http.put<ILogin>(  this.url , data ).subscribe( (d) => {
      this.putCache( d );
      this.subject.next( this.dataStore ) ;
    }
    );
  }
  private putCache( data ) {
    const index = this.dataStore.findIndex(item => item.id === data.id);
    this.dataStore[index] = data;
  }


  public post( data ) {
    return this.http.post<ILogin>(  this.url , data  ).subscribe( (d) => {
      this.dataStore.push ( d );
      this.subject.next( this.dataStore ) ;
    }
    );
  }

  public sendMail( id ) {
    const obj = {'email': id } ;
    return this.http.post<any>(  this.url , obj  );
  }



  public delete( id ) {
    const url = this.url + '/' + id ;
    return this.http.delete<ILogin>(  url   ).subscribe(data => {
      this.deleteCache(id) ;
      this.subject.next( this.dataStore ) ;
    } );
  }

  private deleteCache( id ) {
    this.dataStore = this.dataStore.filter(obj => obj.id !== id );
  }

}
