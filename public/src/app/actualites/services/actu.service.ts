import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActuService {

  ffn = '/api/public/rss/ffn/ffn.json';
  rmc = '/api/public/rss/rmc/rmc.json';
  equipe = '/api/public/rss/equipe/equipe.json';
  sport = '/api/public/rss/sport/sport.json';

  rss = [ this.ffn , this.rmc , this.equipe , this.sport ];
  indice = 0;
  subject$ = new BehaviorSubject(null);
  

  constructor(private http: HttpClient) { }

  public getDatas() {
  return  this.subject$.asObservable();

  }


  public get() {
    this.indice = 0 ;
    const url = this.rss [ 0 ] ;
    this.http.get( url ).subscribe(
      ( m ) => this.subject$.next( m )
    )
  }

  public next() {
    this.indice = this.indice + 1 ;
    if( this.indice >= this.rss.length  ) {
      this.indice = 0 ;
    }
    const url = this.rss [ this.indice ] ;
    return this.http.get( url ).subscribe(
      ( m ) => this.subject$.next( m )
    )
  }
 

}
