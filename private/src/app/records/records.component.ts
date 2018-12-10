import { RecordsService } from './services/records.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  dataForm: FormGroup;
  loading = true ;
  datas: any[] ;

  // tslint:disable-next-line:max-line-length
  nages =  [ {value: 'NL' , label: 'Nage libre' }, {value: 'BR' , label: 'Brasse' }, {value: 'Dos' , label: 'Dos' }, {value: 'Pap' , label: 'Papillon' }]  ;
  dists =  [ '50' , '100' , '200', '400', '800', '1500' ] ;
  bassin =  [ '25' , '50' ] ;
  sexe =  [ {value: 'F' , label: 'Dames' }, {value: 'H' , label: 'Homme' }];



  constructor(private fb: FormBuilder, private rService: RecordsService ) { }

  ngOnInit() {
    this.createForm();

    this.rService.getDatas().pipe(
        shareReplay(1)
    ).subscribe(
        (values ) => {  this.datas = values ; },
        ( error )  => { console.log( error ); },
        () => this.loading = false
    )

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
      this.datas.filter( v =>  v.bassin ===  test.fbassins )
      .filter( v =>  v.sexe ===  test.fsexe )
      .filter( v =>  v.nage ===  test.fnages )
      .filter( v =>  v.distance ===  test.fdists );
      }
      console.log(  this.dataForm.getRawValue()  ) ;
  }


}
