
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

  // tslint:disable-next-line:max-line-length
  nages = [{ value: 'NL', label: 'Nage libre' }, { value: 'BRA', label: 'Brasse' }, { value: 'DOS', label: 'Dos' }, { value: 'PAP', label: 'Papillon' }];
  dists = ['50', '100', '200', '400', '800', '1500', '4x50', '4x100', '4x200', '10x100'];
  bassin = ['25', '50'];
  sexe = [{ value: 'F', label: 'Dames' }, { value: 'H', label: 'Homme' }];

  layoutChanges: Observable<BreakpointState>;

  constructor(private fb: FormBuilder, private rService: RecordsService, private breakpointObserver: BreakpointObserver) { }

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

  quitte() {
    this.dataSelected = null;
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

  showRecord() {

    const test = this.dataForm.getRawValue();


    if (test.fdists !== null) {
      this.loading$.next(true);
      setTimeout(function () { }, 2000);

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

            (datas) => { this.datas = datas; console.log(datas); },
            () => { },
            () => { setTimeout(() => { this.loading$.next(false); }, 500); }

          );

      }
    }
  }


}
