import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActuService } from '../actualites/services/actu.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

public actuActif$ : Observable<boolean> ;

  constructor(private router: Router , private route: ActivatedRoute ,public serv: ActuService  ) {

   this.actuActif$ = this.serv.getActif();


   const keys = this.route.snapshot.queryParamMap.keys ;


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

/*
   @HostListener('panright')
    openSidenav() {
        // open the sidenav
        console.log('open');
    }

    @HostListener('panleft')
    closeSidenav() {
       // close the sidenav
       console.log('close');
    }
*/

}
