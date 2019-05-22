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

       if ( this.cService.next  ) {
          this.datas$ =  this.cService.getCachedCompetitions2().pipe(
            map( item => item.filter( d => d.next  === true ))
          );
      } else {
          this.datas$ =  this.cService.getCachedCompetitions2();
      }

 }

  edit( data ) {
     // envoi data
    if ( data.nb > 0 ) {
      this.router.navigate(['/competitions', data.id]);
    }

  }

  setFilter($event: MatCheckboxChange ) {

       if ( $event.checked  )  {
        this.cService.setNext( true ) ;
        this.datas$ =  this.cService.getCachedCompetitions2().pipe(
          map( item => item.filter( d => d.next  === true ))
        );
       } else {
        this.cService.setNext( false ) ;
        this.datas$ =  this.cService.getCachedCompetitions2();
       }

  }


  ngOnDestroy(): void {
    }



}
