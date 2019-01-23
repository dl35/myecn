import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {

  private url = '/api/public/engagements' ;

  constructor(private http: HttpClient) { }


public getEngagements(id , idlic ) {
    const url = this.url + '/' + id + '/' + idlic ;
    return this.http.get( url ) ;
}

}
