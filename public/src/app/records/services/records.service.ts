import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  private url = '/api/public/records';

  public  getDatas() {
    console.log( this.url );
     return this.http.get<Array<any>>( this.url ).pipe(shareReplay(1));
  }


}
