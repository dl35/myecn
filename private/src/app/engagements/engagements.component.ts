import { CompetEngage } from './models/data-engage';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit , OnDestroy {


  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  datas$: Observable<CompetEngage[]> ;

  toppings = new FormControl();

  idc: number ;
  exist = false ;

  subs$: Subscription;
  engage: any[] ;
  indeterminate = true;


  constructor( changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eService: EngageService , private snackBar: MatSnackBar  ) {
this.mobileQuery = media.matchMedia('(max-width: 600px)');
this._mobileQueryListener = () => changeDetectorRef.detectChanges();
this.mobileQuery.addListener(this._mobileQueryListener);

this.datas$ = this.eService.getCompet();
console.log('create');
}


  ngOnInit() {
console.log('init');
   this.eService.getCompetNext();
  }

  setCompetition( id ) {
   this.subs$ = this.eService.getEngagement( id ).subscribe(
        // tslint:disable-next-line:max-line-length
        (res =>   { if (  res.length === 0 )  { this.idc = id;  this.engage  = null ; } else { this.idc = null ; this.engage = res; this.showSnackBar( 'Engagements: ' + res.length , true );  }    } ) ,
        (err =>   {  this.showSnackBar( err.error.message , false ); } ) ,

    );
  }
  ngOnDestroy(): void {
    if ( this.subs$ ) {
      this.subs$.unsubscribe();
    }

   }

   doChange($event, v ) {

    console.log( $event ) ;

      if ( $event.checked === true  && this.indeterminate === false  ) {
          this.indeterminate = true; 
          $event.checked = null;
      }
   


   }



   private showSnackBar( message , info) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if ( !info ) {
      style = 'snack-error';
    }
    this.snackBar.open( message  , '', {
      duration: 1500,
      announcementMessage : 'denis',
      panelClass: [ style ]
    });
  }

}
