import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatsService {


  private  url = '/api/public/stats'   ;
  constructor(private http: HttpClient) { }


    public getDatas() {
        return this.http.get(this.url);
    }



}
