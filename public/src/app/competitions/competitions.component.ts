import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompetitionsService, ICompetitions, IEngagements } from './services/competitions.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatGridList } from '@angular/material';
import { MediaMatcher, BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements  OnInit, OnDestroy {
  @ViewChild('grid') grid: MatGridList;

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  };


  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  dataForm = new FormControl();
  datas: ICompetitions[];
  engs: IEngagements[];
  destroyed$: Subject<any> = new Subject();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(public breakpointObserver: BreakpointObserver, private cService: CompetitionsService ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large ])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          console.log( state.breakpoints );
        } else {
          console.log('Viewport is getting smaller!');
        }
      });
   }

  ngOnInit() {
    this.cService.getCompetitions().pipe(takeUntil(this.destroyed$)).subscribe(
      (datas) => { this.datas = datas; },
      (error) => { console.log( error ); }
    );
  }

  /*
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  */


  private getEngagements( id ) {
      this.loading$.next(true);
      this.cService.getEngagements(id).pipe(takeUntil(this.destroyed$)).subscribe(
        (engs) => { this.engs = engs; console.log( engs );  this.setLoading(); } ,
        (error) => { console.log( error ); }
      );
  }

  private setLoading() {
    setTimeout(() => {
      this.loading$.next(false);
    }, 500);

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.loading$.unsubscribe();
  }

}
