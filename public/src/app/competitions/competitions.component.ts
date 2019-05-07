import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService, ICompetitions } from './services/competitions.service';
import { Observable } from 'rxjs';
import { MatCheckboxChange } from '@angular/material';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit, OnDestroy {

/*
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
*/

 // mycol = this.gridByBreakpoint['lg'];
 // myclass = this.classByBreakpoint['lg'];

  filtre = [ {  label: '' }, {  label: 'Les présents' } ,
  { label: 'Les Absents' } , { label: 'En Attente' } ];
  filtreLabel = this.filtre[0].label ;
  filtreValue = 0 ;
  datas$: Observable<ICompetitions[]> ;

  constructor( private cService: CompetitionsService , private router: Router) {
  }
  ngOnInit() {
    this.datas$ =  this.cService.getCachedCompetitions2().pipe(
      map( item => item.filter( d => d.next  === true ))
    );
 /*   this.datas$.pipe(
        (map ( (item: ICompetitions[] )   => item.filter( (it)  => it.next === true    ) ) ) ).subscribe();*/
 }

  edit( data ) {
     // envoi data 
    if ( data.nb > 0 ) {
      this.router.navigate(['/competitions', data.id]);
    }

  }

  setFilter($event: MatCheckboxChange ) {

       if ( $event.checked  )  {
        this.datas$ =  this.cService.getCachedCompetitions2().pipe(
          map( item => item.filter( d => d.next  === true ))
        );
       } else {
        this.datas$ =  this.cService.getCachedCompetitions2();
       }

  }

 /*
private doFilter() {

    ( this.filtreValue === 3 ) ? this.filtreValue = 0 :  this.filtreValue = this.filtreValue + 1 ;
    this.filtreLabel = this.filtre[this.filtreValue].label ;
 
    if ( this.filtreValue === 0 ) {
        this.engs = this.cachedEngs ;
        return;
      }

  const mtmp = Array();
  if ( this.filtreValue === 1 ) {
    this.cachedEngs.forEach(item => {

      item.eng.forEach(e => {
        if ( e.presence === 'oui'  )  { mtmp.push(item); return; }
      });

    });

  } else if ( this.filtreValue === 2 ) {
    this.cachedEngs.forEach(item => {

      item.eng.forEach(e => {
        if ( e.presence === 'non'  )  { mtmp.push(item); return; }
      });

    });

  } else {
    this.cachedEngs.forEach(item => {

      item.eng.forEach(e => {
        if (e.presence === 'at' )  { mtmp.push(item); return; }
      });

    });
  }

  this.engs = mtmp ;
}
*/

/*
  initResponsive() {
    this.mediaObserver.media$.pipe(takeUntil(this.destroyed$)).subscribe((change: MediaChange) => {
      this.mycol = this.gridByBreakpoint[change.mqAlias];
      this.myclass = this.classByBreakpoint[change.mqAlias];
    },
      () => { },
      () => { },

    );

  }*/



  /*
  public getEngagements( id ) {
    this.loading$.next(true);
    this.cService.getEngagements(id).pipe(takeUntil(this.destroyed$)).subscribe(
      (engs) => { this.engs = engs; this.cachedEngs = engs ;  this.filtreLabel = this.filtre[0].label ;
        this.filtreValue = 0 ;  } ,
      (error) => { console.log( error ); },
      () => { this.setLoading(); }
    );
}
*/


  ngOnDestroy(): void {
    }



}
