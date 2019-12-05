
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RecordsService } from './services/records.service';
import { IRecords } from './models/models-records';




@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataForm: FormGroup;
  datas: Array<any>;
  dataSelected: IRecords;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  compet$: Observable<any[]>;

  // tslint:disable-next-line:max-line-length
  nages = [{ value: 'NL', label: 'Nage libre' }, { value: 'BRA', label: 'Brasse' }, { value: 'DOS', label: 'Dos' }, { value: 'PAP', label: 'Papillon' },{ value: '4N', label: '4 Nages' }];
  dists_nl = ['50', '100', '200', '400', '800', '1500', '4x50', '4x100', '4x200', '10x100'];
  dists_n = ['50', '100', '200'];
  dists_4n = ['100', '200', '400'];
  dists = this.dists_nl ;
  bassin = ['25', '50'];
  sexe = [{ value: 'F', label: 'Dames' }, { value: 'H', label: 'Homme' }];

  layoutChanges: Observable<BreakpointState>;

  constructor(private fb: FormBuilder, private rService: RecordsService, private breakpointObserver: BreakpointObserver) {
    this.compet$ = this.rService.getCompetitions();

   }

   getClass( type ) {
    let cssClasses;

    if (type === 'CLUB' ) {
      cssClasses = { 'CLUB': true };
    } else if (type === 'DEP' ) {
      cssClasses = { 'DEP': true };
    } else if  (type === 'REG' ) {
      cssClasses = { 'REG': true };
    } else {
      cssClasses = { 'FRA': true };
    }
      return cssClasses ;
  }

  ngOnInit() {
    this.createForm();

    this.layoutChanges = this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]);

  }

  edit(data) {
    this.dataSelected = data;
  }

  quitte(v) {
    this.dataSelected = null;
    if ( v ) {
      this.showRecord();
    }

    }


  createForm() {
    this.dataForm = this.fb.group({
      fnages: ['NL'],
      fbassin: ['25'],
      fsexe: ['F'],
      fdists: [null],
      fmasters: [false]
    });

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


  showRecord() {


    if (  this.dataForm.get('fdists') ) {
      this.loading$.next(true);
      this.setDistNage() ;
      setTimeout(function () {
      }, 2000);

      const test = this.dataForm.getRawValue();
      if (test.fmasters) {

        this.rService.get().pipe(
          map(v => v.filter(t => t.bassin === test.fbassin
            && t.sexe === test.fsexe
            && t.nage === test.fnages
            && t.distance === test.fdists && (t.age.startsWith('C') || t.age.startsWith('R'))
          ))).subscribe(

            (datas) => this.datas = datas,
            () => { },
            () => { setTimeout(() => { this.loading$.next(false); }, 500); }

          );
      } else {

        this.rService.get().pipe(
          map(v => v.filter(t => t.bassin === test.fbassin
            && t.sexe === test.fsexe
            && t.nage === test.fnages
            && t.distance === test.fdists && (t.age.startsWith('C') === false && t.age.startsWith('R') === false)
          ))).subscribe(

            (datas) => { this.datas = datas; },
            () => { },
            () => { setTimeout(() => { this.loading$.next(false); }, 500); }

          );

      }
    }
  }


}
