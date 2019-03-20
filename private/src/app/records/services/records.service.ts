import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/torecords' ;

  public  get() {
     return this.http.get<Array<any>>( this.url ).pipe(
      shareReplay(1)
     );
  }
  public  upload( file ) {
     const url = this.url + '/upload' ;
     return this.http.post<any>( url , file );
  }

  public  put( data ) {
     return this.http.put<any>( this.url , data );
  }

  public  post( data ) {
    return this.http.post<any>( this.url , data );
 }


}