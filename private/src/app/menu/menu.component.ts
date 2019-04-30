
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { TexteRoutesService } from '../services/texte-routes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  title: Observable<string> ;
  layoutChanges: Observable<BreakpointState>;
  role = {};

  constructor(private breakpointObserver: BreakpointObserver, private textRoute: TexteRoutesService, private router: Router) {

    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
    this.title = this.textRoute.getMessage() ;



}

ngOnInit() {

      // admin, user, ent
      const profile = sessionStorage.getItem('profile') ;
      console.log( profile );
      this.role[profile] = true ;    // admin, user, ent



}



}
