import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RecordsService, IRecords } from './services/records.service';
import { Subject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';





@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit  {



  public dataForm: FormGroup;
  // private cachedDatas: IRecords[] ;
  // public datas: IRecords[] ;



  datas$: Observable<IRecords[]> ;
  layoutChanges: Observable<BreakpointState>;



  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BRA' , label: 'Brasse' }, {value: 'DOS' , label: 'Dos' }, {value: 'PAP' , label: 'Papillon' }]  ;
  dists =  [ '50' , '100' , '200', '400', '800', '1500' , '4x50', '4x100' , '4x200' , '10x100' ];
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

    this.datas$ =  this.recService.getRecords().pipe( take(10) ) ;

//    this.getRecords();
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



   public showRecord() {

     const test = this.dataForm.getRawValue() ;
      console.log( test );

     this.datas$ =  this.recService.getRecords().pipe(

      (map( item => item.filter( (t)  => { if ( test.fmasters ) {
                  // tslint:disable-next-line:no-unused-expression
                  t.bassin ===  test.fbassin &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages &&  t.distance ===  test.fdists
                  &&  ( t.age.startsWith('C') || t.age.startsWith('R') );
                 } else {

                 // tslint:disable-next-line:no-unused-expression
                 t.bassin ===  test.fbassin &&  t.sexe ===  test.fsexe
                 &&  t.nage ===  test.fnages &&  t.distance ===  test.fdists
                 &&  ( t.age.startsWith('C') === false &&  t.age.startsWith('R') === false );
                 }  }
                              ) ) )
     ) ;

   

  }



 
}

