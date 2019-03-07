
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { TexteRoutesService } from '../services/texte-routes.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {

  title: Observable<string> ;
  layoutChanges: Observable<BreakpointState>;
  constructor(private breakpointObserver: BreakpointObserver, private textRoute: TexteRoutesService) {

    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);
    this.title = this.textRoute.getMessage() ;
}
}
