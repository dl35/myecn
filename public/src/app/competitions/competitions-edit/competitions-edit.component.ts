import { IEngagements } from './../services/competitions.service';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service';
import {  ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.scss']
})
export class CompetitionsEditComponent implements OnInit , OnDestroy {
  private sub: any;
  id: number;
  datas$: Observable<IEngagements[]> ;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  classByBreakpoint = {
    xl: 'matselect-xl',
    lg: 'matselect-lg',
    md: 'matselect-md',
    sm: 'matselect-sm',
    xs: 'matselect-xs',
  };

  mycol = this.gridByBreakpoint['lg'];
  myclass = this.classByBreakpoint['lg'];
  destroyed$: Subject<any> = new Subject();



  constructor( private cService: CompetitionsService , private route: ActivatedRoute , private mediaObserver: MediaObserver) {
    this.initResponsive();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
  }

  ngOnInit() {
    this.datas$ =  this.cService.getEngagements( this.id ) ;
      }


      initResponsive() {
        this.mediaObserver.media$.pipe(takeUntil(this.destroyed$)).subscribe((change: MediaChange) => {
          this.mycol = this.gridByBreakpoint[change.mqAlias];
          this.myclass = this.classByBreakpoint[change.mqAlias];
        },
          () => { },
          () => { },

        );

      }



  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.sub.unsubscribe();
  }

}