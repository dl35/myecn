import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private url = '/api/private/toadmin' ;
    constructor(private http: HttpClient) { }

    public getParams( ) {
      const uget = this.url + '/params' ;
      return this.http.get<any>( uget ) ;

    }

    public updateParams( datas ) {
      return this.http.put<any>( this.url , datas ) ;

    }



    public clearEngagements( ) {
      const upost = this.url + '/engagements' ;
      return this.http.delete<any>( upost ) ;

    }

    public clearCompetitions() {
      const upost = this.url + '/competitions' ;
      return this.http.delete<any>( upost ) ;
    }

    public prepareTableLicencies() {
      const uget = this.url + '/prepare' ;
      return this.http.get<any>( uget ) ;
    }

    public sendInscriptions() {
      const uget = this.url + '/send' ;
      return this.http.get<any>( uget ) ;
    }

    public addTest() {
      const uget = this.url + '/addtest' ;
      return this.http.get<any>( uget ) ;
    }

    public delTest() {
      const uget = this.url + '/deltest' ;
      return this.http.get<any>( uget ) ;
    }

}
