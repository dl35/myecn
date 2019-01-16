import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecordsService } from './services/records.service';





@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataForm: FormGroup;
  datas: Array<any> ;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BRA' , label: 'Brasse' }, {value: 'DOS' , label: 'Dos' }, {value: 'PAP' , label: 'Papillon' }]  ;
  dists =  [ '50' , '100' , '200', '400', '800', '1500' , '4x50', '4x100' , '4x200' , '10x100' ];
  bassin =  [ '25' , '50' ] ;
  sexe =  [ {value: 'F' , label: 'Dames' }, {value: 'H' , label: 'Homme' }];



  constructor(private fb: FormBuilder, private rService: RecordsService ) { }

  ngOnInit() {
    this.createForm();

  }


  createForm() {
    this.dataForm = this.fb.group({
          fnages : ['NL'],
          fbassin : ['25'],
          fsexe : ['F'],
          fdists : [null],
          fmasters : [false]
            });

  }

  showRecord() {

     const test = this.dataForm.getRawValue() ;

console.log(  test );

      if ( test.fdists !== null ) {
        this.loading$.next(true);
        setTimeout(function() {  }, 2000 );
       
        if ( test.fmasters ) {

          this.rService.getDatas().pipe(
            map( v =>  v.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  (t.age.startsWith('C') || t.age.startsWith('R') )
              ) )).subscribe(

                (datas) =>  this.datas = datas ,
                (error) =>  {},
                () =>  { setTimeout( () => { this.loading$.next(false) ; }, 500); }

              );
        } else {

          this.rService.getDatas().pipe(
            map( v =>  v.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  ( t.age.startsWith('C') === false &&  t.age.startsWith('R') === false )
              ) )).subscribe(

                (datas) =>  this.datas = datas ,
                (error) => {} ,
                () =>  { setTimeout( () => { this.loading$.next(false) ; }, 500); }

              );

        }
        }
  }


}

