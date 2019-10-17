import { Observable, of } from 'rxjs';
import { ActuService } from './services/actu.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {


  layoutChanges$: Observable<BreakpointState>;

  datas$ = new Observable<any>();
  logo$ = new Observable<string>();

  constructor(public serv: ActuService , private breakpointObserver: BreakpointObserver) { 
    this.layoutChanges$ = this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);

  }

  ngOnInit() {
    this.logo$ = this.serv.getLogo();
    this.datas$ = this.serv.getDatas();
    this.serv.get();

  }

  toNext() {
    this.serv.next();
  }

}
