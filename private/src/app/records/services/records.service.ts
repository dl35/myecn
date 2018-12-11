import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private http: HttpClient) { }

  private url = '/api/private/records' ;

  public  getDatas() {
    //  from , dests, compet
     return this.http.get<Array<any>>( this.url ).pipe(
      shareReplay(1)
     );
  }


}