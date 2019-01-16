import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface IMessageResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdhesionService {

  constructor(private http: HttpClient) { }

  private url = '/api/public/adhesion';

  public getLicencies(id) {
    const url = this.url + '/' + id;
    return this.http.get<IMessageResponse>( url );
  }

  public addLicencies(data) {
    return this.http.post<IMessageResponse>( this.url,  data );
  }

  public updateLicencies(id, data ) {
    const url = this.url + '/' + id;
    return this.http.put<IMessageResponse>( url , data );

  }


}
