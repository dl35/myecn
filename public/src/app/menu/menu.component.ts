import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router , private route: ActivatedRoute ) {



   const keys = this.route.snapshot.queryParamMap.keys ;
   console.log( keys  , keys.length ) ;

   if (  keys.length !== 1 ) {
     return ;
    }

    const key = keys[0];


    if ( typeof key === 'undefined' ) {
       return ;
    }



   if ( key === 'adhesion' )  {
      this.router.navigate([key]);
   } else  if ( key.startsWith('adhesion/')  ) {
      this.router.navigate([key]);
   } else if ( key.startsWith('engagements/')  ) {
    this.router.navigate([key]);
   } else {
    this.router.navigate(['']);
   }

   }



}
