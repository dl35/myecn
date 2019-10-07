import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  url = '/api/public/rss/rmc.json';
  constructor(private http: HttpClient) { }


  public get() {
  return this.http.get( this.url );

  }



}
