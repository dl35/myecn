import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  private url = '/api/private/toadmin' ;
    constructor(private http: HttpClient) { }

    public getRappel( type ) {
      const uget = this.url + '/rappel/' + type ;
      return this.http.get<any>( uget );

    }
    public saveRappel( body ) {
      const upost = this.url + '/rappel' ;
      return this.http.post<any>( upost , body ) ;
    }
    public getAncien(type) {
      const uget = this.url + '/ancien/' + type ;
      return this.http.get<any>( uget ) ;

    }
    public saveAncien( body ) {
      const uget = this.url + '/ancien' ;
      return this.http.post<any>( uget , body ) ;
    }

    public getNouveau( type ) {
      const uget = this.url + '/nouveau/' + type ;
      return this.http.get<any>( uget ) ;

    }
    public saveNouveau( body ) {
      const uget = this.url + '/nouveau' ;
      return this.http.post<any>( uget , body ) ;
    }
  
}
