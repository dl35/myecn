import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private url = '/api/private/admin' ;
    constructor(private http: HttpClient) { }

    public reinitEngagements( ) {
      const upost = this.url + '/engagements' ;
      return this.http.delete<any>( upost ) ;

    }

    public reinitCompetitions() {
      const upost = this.url + '/competitions' ;
      return this.http.delete<any>( upost ) ;
    }

    public createLicencies( data ) {
      const upost = this.url + '/licencies' ;
      return this.http.post<any>( upost , data  ) ;
    }
}
