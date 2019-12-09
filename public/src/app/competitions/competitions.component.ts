import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService, ICompetitions } from './services/competitions.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';


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
  filterForm$: Observable<any>;
  filteredProducts$: BehaviorSubject<ICompetitions[]> ;


  public dataForm: FormGroup;


  constructor(private fb: FormBuilder, public cService: CompetitionsService , private router: Router) {
  }
  ngOnInit() {
    this.createForm();

    this.filteredProducts$ = new BehaviorSubject([]);
    this.datas$ =  this.cService.getCompetitions() ;

    combineLatest( [ this.datas$ , this.filterForm$ ] )
    .pipe(
     map ( ([ items , test ])  =>
         items.filter( item => item.next  === test.chkFutures )
     )).subscribe(
        (v) => this.filteredProducts$.next(v)
      ) ;

      this.dataForm.get('chkFutures').setValue(true);

 }

 createForm() {
  this.dataForm = this.fb.group({
    chkFutures: [false]
  });

  this.filterForm$ = this.dataForm.valueChanges ;
}

edit( data ) {
     // envoi data
    if ( data.nb > 0 ) {
      this.cService.compet = data ;

      this.router.navigate(['/competitions', data.id] );
    }

  }

  ngOnDestroy(): void {
    }



}
