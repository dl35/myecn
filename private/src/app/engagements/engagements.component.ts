import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit {


  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  constructor( changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher ) {
this.mobileQuery = media.matchMedia('(max-width: 600px)');
this._mobileQueryListener = () => changeDetectorRef.detectChanges();
this.mobileQuery.addListener(this._mobileQueryListener);

}


  ngOnInit() {
  }

}
