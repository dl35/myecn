import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private url = '/api/private/toadmin' ;
    constructor(private http: HttpClient) { }

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


}
