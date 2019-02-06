import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RecordsService, IRecords } from './services/records.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, map, filter, shareReplay } from 'rxjs/operators';





@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit, OnDestroy  {



  public dataForm: FormGroup;
  private cachedDatas: IRecords[] ;
  public datas: IRecords[] ;

  private gridByBreakpoint = {
    xl: { col: 3 },
    lg: { col: 3 },
    md: { col: 2 },
    sm: { col: 1 },
    xs: { col: 1 }

  };
  private gridCol = this.gridByBreakpoint['lg'].col;
  

  destroyed$: Subject<any> = new Subject();

  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BRA' , label: 'Brasse' }, {value: 'DOS' , label: 'Dos' }, {value: 'PAP' , label: 'Papillon' }]  ;
  dists =  [ '50' , '100' , '200', '400', '800', '1500' , '4x50', '4x100' , '4x200' , '10x100' ];
  bassin =  [ '25' , '50' ] ;
  sexe =  [ {value: 'F' , label: 'Dames' }, {value: 'H' , label: 'Homme' }];



  constructor(private mediaObserver: MediaObserver, private fb: FormBuilder, private recService: RecordsService ) { }

  ngOnInit() {
    this.createForm();
    this.initResponsive();
    this.getRecords();
  }



  private initResponsive() {
    this.mediaObserver.media$.pipe(takeUntil(this.destroyed$)).subscribe((change: MediaChange) => {
      this.gridCol = this.gridByBreakpoint[change.mqAlias].col;
      
    },
      (error) => { },
      () => { },

    );

  }

  private createForm() {
    this.dataForm = this.fb.group({
          fnages : ['NL'],
          fbassin : ['25'],
          fsexe : ['F'],
          fdists : [null],
          fmasters : [false]
            });

  }


  private getRecords() {
    this.recService.getDatas().pipe( takeUntil(this.destroyed$) ).subscribe(
        (datas) => { this.cachedDatas = datas ; } ,
        (error) => { } ,
        () => {   } ,
    );
   }

   private getStyle(type) {

     if ( type === 'DEP') {
        return {  'background-color': 'blue' , 'color': 'white' } ;
       } else if ( type === 'REG') {
        return {  'background-color': 'rgb(113, 0, 128)' , 'color': 'white' } ;
       } else if ( type === 'FRA') {
        return {  'background-color': 'rgb(173, 214, 173)' , 'color': 'white' } ;
      } else {
        return {  'background-color': 'green' , 'color': 'white' } ;
      }

   }

   public showRecord() {

     const test = this.dataForm.getRawValue() ;

      if ( test.fdists !== null ) {

        if ( test.fmasters ) {

         this.datas =  this.cachedDatas.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  (t.age.startsWith('C') || t.age.startsWith('R') )
              )  ;
        } else {

          this.datas =  this.cachedDatas.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  ( t.age.startsWith('C') === false &&  t.age.startsWith('R') === false )
              )  ;

        }
        }
  }



  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

