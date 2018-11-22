import { CompetEngage } from './models/data-engage';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';


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


  constructor( changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eService: EngageService  ) {
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
        (res =>   { if (  res.length === 0 )  { this.idc = id;  } else { this.idc = null ; this.engage = res;  }    } ) ,
        (err =>   { window.alert( err.error.message ); } ) ,

    );
  }
  ngOnDestroy(): void {
    if ( this.subs$ ) {
      this.subs$.unsubscribe();
    }

   }



}
