import { IEngagements, ICompetitions } from './../services/competitions.service';
import {Location} from '@angular/common';
import { Observable, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service';
import {  ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil, map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.scss']
})
export class CompetitionsEditComponent implements OnInit , OnDestroy {
  private sub: any;
  id: number;
  compet: ICompetitions ;
  public dataForm: FormGroup;

  products$: Observable<IEngagements[]>;
  filterForm$: Observable<any>;
  filteredProducts$: BehaviorSubject<IEngagements[]>;

  filter = { pre: true , abs: true ,  att: true } ;
  

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
  myrowheight =this.rowHeight['lg'];
  destroyed$: Subject<any> = new Subject();



  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder,  private cService: CompetitionsService , private route: ActivatedRoute , private mediaObserver: MediaObserver, private location: Location) {
    this.initResponsive();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });

   this.compet = this.cService.compet;

  }

  ngOnInit() {
    this.createForm() ;

    this.products$ =  this.cService.getEngagements(this.id);
    this.filteredProducts$ = new BehaviorSubject([]);
    combineLatest( [ this.products$ , this.filterForm$ ] )
    .pipe(
     map ( ([ items , test ])  =>
     items.filter( t => {
          let res = false;
      t.eng.forEach( c => {
        if ( test.ckPresent  &&  c.presence === 'oui'  ) {
          res = true ;
         }
        if ( test.ckPresent &&  c.presence === 'non'  ) {
          res = true ;
          }
        if (test.ckAttente  &&  c.presence === 'at'  ) {
          res = true ;
          }
      } ) ;
        return res ; }

     ))).subscribe(
      (v) => this.filteredProducts$.next(v)) ;

     this.dataForm.get('ckPresent').setValue(true);

      }

      createForm() {
        this.dataForm = this.fb.group({
          ckAttente: [true],
          ckAbsent: [true],
          ckPresent: [false]
        });

        this.filterForm$ = this.dataForm.valueChanges ;
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
    this.sub.unsubscribe();
  }

}