import { IEngagements, ICompetitions } from './../services/competitions.service';
import {Location} from '@angular/common';
import { Observable, Subject, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService } from '../services/competitions.service';
import {  ActivatedRoute } from '@angular/router';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { takeUntil, filter, tap, map, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.scss']
})
export class CompetitionsEditComponent implements OnInit , OnDestroy {
  private sub: any;
  id: number;
  datas$: Observable<IEngagements[]> ;

  filter = { pre: true , abs: true ,  att: true } ;
  compet$: Observable<ICompetitions>;

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
  constructor( private cService: CompetitionsService , private route: ActivatedRoute , private mediaObserver: MediaObserver, private location: Location) {
    this.initResponsive();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
  }

  ngOnInit() {
    this.cService.getEngagements( this.id);
    this.datas$ = this.cService.engages$ ;
    this.compet$ = this.cService.compet$ ;

   
      }

  doFilter() {
 
    
    this.cService.doFilter ( this.filter );

  }

  /*
  myfilter( e  ) {
    let res = false;
    e.forEach( c => {
       if ( c.presence === this.filtre.pre  ) {
            res = true ;
       }
  
    });
  return   res  ;
  
  }*/
  
  
  /*
  doFilter() {
  
  
    this.engage$ = this.eService.getObservable().pipe(
     map( item =>   item.filter( d =>   ( this.filtre.notif === '0'  ) ?  (d.notification === 0 ) : (d) )),
     map( item =>   item.filter( d =>   ( this.filtre.notif === '1'  ) ?  (d.notification > 0 ) : (d) )),
     map( item =>   item.filter( d =>   ( this.filtre.ext  === null  ) ?  (d) : (  d.extranat === this.filtre.ext  ) )),
     map( item =>   item.filter( d =>   ( this.filtre.pre === null   ) ?  (d)  :  this.myfilter(d.eng) ) ) );
  
  
   }*/
  

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