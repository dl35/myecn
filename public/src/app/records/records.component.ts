import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RecordsService, IRecords } from './services/records.service';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';





@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit  {

  public dataForm: FormGroup;

  products$: Observable<IRecords[]>;
  filterForm$: Observable<any>;
  filteredProducts$: BehaviorSubject<IRecords[]>;

  layoutChanges: Observable<BreakpointState>;

  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BRA' , label: 'Brasse' }, {value: 'DOS' , label: 'Dos' }, {value: 'PAP' , label: 'Papillon' }, {value: '4N' , label: '4 Nages' }]  ;
  dists_nl = ['50', '100', '200', '400', '800', '1500', '4x50', '4x100', '4x200', '10x100'];
  dists_n = ['50', '100', '200'];
  dists_4n = ['100', '200', '400'];
  dists = this.dists_nl ;

  bassin =  [ '25' , '50' ] ;
  sexe =  [ {value: 'F' , label: 'Dames' }, {value: 'H' , label: 'Homme' }];




  constructor(private fb: FormBuilder, private recService: RecordsService  , private breakpointObserver: BreakpointObserver ) { }

  ngOnInit() {
    this.createForm();

    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);

    this.products$ =  this.recService.getRecords();
    this.filteredProducts$ = new BehaviorSubject([]);


      combineLatest( [ this.products$ , this.filterForm$ ] )
      .pipe(
       map ( ([ items , test ])  =>
       items.filter(t =>
           ( test.fmasters ) ?
           ( t.bassin === test.fbassin && t.sexe === test.fsexe
             && t.nage === test.fnages && t.distance === test.fdists
             &&  ( t.age.startsWith('C') || t.age.startsWith('R') ) ) :
           ( t.bassin === test.fbassin && t.sexe === test.fsexe
             && t.nage === test.fnages && t.distance === test.fdists
             && (t.age.startsWith('C') === false && t.age.startsWith('R') === false) )

       ))).subscribe(
        (v) => this.filteredProducts$.next(v)) ;


      this.dataForm.get('fnages').valueChanges
      .subscribe( ()  => this.setDistNage() ) ;

  }

  createForm() {
    this.dataForm = this.fb.group({
      fnages: ['NL'],
      fbassin: ['25'],
      fsexe: ['F'],
      fdists: [null],
      fmasters: [false]
    });

    this.filterForm$ = this.dataForm.valueChanges ;
  }


  setDistNage() {
    const test = this.dataForm.getRawValue();
       if ( test.fnages === 'NL' ) {
        this.dists = this.dists_nl;
      } else if ( test.fnages === '4N' ) {
        this.dists = this.dists_4n;
        if ( this.dists.indexOf(test.fdists) === -1 ) {
          this.dataForm.get('fdists').setValue('400');
        }

      } else {
        this.dists = this.dists_n ;
        if ( this.dists.indexOf(test.fdists) === -1 ) {
          this.dataForm.get('fdists').setValue('200');
        }
      }
  }


}

