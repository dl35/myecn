
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {


   display = true ;

  constructor(private breakpointObserver: BreakpointObserver) {

    const layoutChanges = breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]);

    layoutChanges.subscribe(result => {


      if ( result.matches ) {
        this.display = true;

      } else {
        this.display = false;
      }


    });

  }





}
