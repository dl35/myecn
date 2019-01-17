import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RecordsService } from './services/records.service';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataForm: FormGroup;
  datas: Array<any> ;
  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BRA' , label: 'Brasse' }, {value: 'DOS' , label: 'Dos' }, {value: 'PAP' , label: 'Papillon' }]  ;
  dists =  [ '50' , '100' , '200', '400', '800', '1500' , '4x50', '4x100' , '4x200' , '10x100' ];
  bassin =  [ '25' , '50' ] ;
  sexe =  [ {value: 'F' , label: 'Dames' }, {value: 'H' , label: 'Homme' }];



  constructor(private fb: FormBuilder, private recService: RecordsService ) { }

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


      if ( test.fdists !== null ) {
        this.loading$.next(true);
        setTimeout(function() {  }, 2000 );

        if ( test.fmasters ) {

          this.recService.getDatas().pipe(
            map( v =>  v.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  (t.age.startsWith('C') || t.age.startsWith('R') )
              ) )).subscribe(

                (datas) => { this.datas = datas ; console.log(datas) },
                (error) =>  {},
                () =>  { setTimeout( () => { this.loading$.next(false) ; }, 500); }

              );
        } else {

          this.recService.getDatas().pipe(
            map( v =>  v.filter( t =>   t.bassin ===  test.fbassin
                  &&  t.sexe ===  test.fsexe
                  &&  t.nage ===  test.fnages
                  &&  t.distance ===  test.fdists   &&  ( t.age.startsWith('C') === false &&  t.age.startsWith('R') === false )
              ) )).subscribe(

                (datas) => { this.datas = datas ; console.log(datas) } ,
                (error) => {} ,
                () =>  { setTimeout( () => { this.loading$.next(false) ; }, 500); }

              );

        }
        }
  }


}

