import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InitModels } from './initmodels';

@Injectable({
  providedIn: 'root'
})
export class ActuService {


  init = '/api/public/rss/init.json';
  subject$ = new BehaviorSubject(null);
  logo$ = new BehaviorSubject(null);
  actif$ = new BehaviorSubject(false);

  params = {
    'actif': false,
    'scenario': [],
  };

  index = 0;


  constructor(private http: HttpClient) {
    this.getInit().subscribe(
      (d) => { this.actif$.next(d.actif); this.params = d; },
      (err) => { this.actif$.next(false); }
    );

  }

  public getDatas() {
    return this.subject$.asObservable();
  }

  public getLogo() {
    return this.logo$.asObservable();
  }
  public getActif() {
    return this.actif$.asObservable();
  }


  private getInit() {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<InitModels>(this.init, { headers: headers });
  }


  public get() {
    const url = this.params.scenario[this.index].url;
    const logo = this.params.scenario[this.index].logo;

    this.http.get<any>(url).subscribe(
      (m) => { this.logo$.next(logo); this.subject$.next(m); }
    )
  }

  public next() {
    this.index = this.index + 1;
    if (this.index >= this.params.scenario.length) {
      this.index = 0;
    }

    this.get();
  }


}
