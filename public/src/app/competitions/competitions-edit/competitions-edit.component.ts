import { IEngagements, ICompetitions } from './../services/competitions.service';
import { Location } from '@angular/common';
import { Observable, Subject, combineLatest } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service';
import { ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil, map, shareReplay, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.scss']
})
export class CompetitionsEditComponent implements OnInit, OnDestroy {
  id: number;
  compet: ICompetitions;
  public dataForm: FormGroup;

  filterForm$: Observable<any>;
  products$: Observable<IEngagements[]>;
  data$: Observable<IEngagements[]>;

  filter = { pre: true, abs: true, att: true };


  rowHeight = {
    xl: '3:1',
    lg: '5:2',
    md: '5:2',
    sm: '4:2',
    xs: '5:2'
  };



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
  myrowheight = this.rowHeight['lg'];
  destroyed$: Subject<any> = new Subject();



  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private cService: CompetitionsService, private route: ActivatedRoute, private mediaObserver: MediaObserver, private location: Location) {
    this.initResponsive();
    this.products$ = this.cService.getEngagementsObs();
    this.route.params
      .pipe(map((params) => +params['id']))
      .subscribe((id) => { this.id = id; this.cService.getEngagements(id); });

    this.compet = this.cService.compet;

  }

  ngOnInit() {
    this.createForm();
    this.data$ = combineLatest([this.filterForm$, this.products$])
      .pipe(
        map(([test, items]) =>
          items.filter(t => {
            let res = false;
            t.eng.forEach(c => {
              if (test.ckPresent && c.presence === 'oui') {
                res = true;
              }
              if (test.ckAbsent && c.presence === 'non') {
                res = true;
              }
              if (test.ckAttente && c.presence === 'at') {
                res = true;
              }
            });
            return res;
          }

          )

        ),
        shareReplay(1)

      );

  }

  createForm() {
    this.dataForm = this.fb.group({
      ckAttente: [true],
      ckAbsent: [true],
      ckPresent: [true]
    });

    this.filterForm$ = this.dataForm.valueChanges.pipe(startWith(this.dataForm.value));
  }



  initResponsive() {
    this.mediaObserver.media$.pipe(takeUntil(this.destroyed$)).subscribe((change: MediaChange) => {
      this.mycol = this.gridByBreakpoint[change.mqAlias];
      this.myclass = this.classByBreakpoint[change.mqAlias];
      this.myrowheight = this.rowHeight[change.mqAlias];
    },
      () => { },
      () => { },

    );

  }

  toback() {
    this.location.back();

  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();

  }

}
