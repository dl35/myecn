import { PiscinesService } from './../services/piscines.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataCompet } from 'src/app/competitions/models/data-compet';

@Component({
  selector: 'app-edit-piscine',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public dataForm: FormGroup ;

  public allLongueur = [ '25' , '50' ];
  public allCouloirs = [ '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , '11', '12' ];

  public id: string ;

  @Output() quitte = new EventEmitter<Boolean>();

  @Input()
  set data(id: string) {
    this.id = id ;
  }


  constructor(private formBuilder: FormBuilder, private pisService: PiscinesService ) {
    this.createForm() ;

  }

  public doquitte() {


    this.quitte.emit(true);
  }

  public dosave() {
    const datas  = this.dataForm.getRawValue();
    if ( datas.id === null ) {
      delete datas.id ;
    }
    this.pisService.post(datas).subscribe(
      () =>  console.log('ok')  ,
      () =>  console.log('ko')

    ) ;

  //  this.quitte.emit(true);
  }



  ngOnInit() {
  }

  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      id: new FormControl( null ),
      libelle: ['', [Validators.required] ],
      adresse:  ['', [Validators.required] ],
      cp: [ null , [ Validators.required , Validators.pattern(/^[0-9]{5}$/) ]] ,
      ville: [ null , [Validators.required] ],
      latitude: [ null  , [Validators.required , Validators.pattern(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/) ] ],
      longitude: [null, [Validators.required , Validators.pattern(/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/)  ] ],
      bassins: this.formBuilder.array( [ this.createBassin() ] )
    }

  );

  }

  private initForm() {
  if ( this.id === '-1' ) {
    return ;
  }

  }


  createBassin(): FormGroup {
    return this.formBuilder.group({
      longueur:  ['25', [Validators.required] ],
      couloirs:  ['5', [Validators.required] ]
    });
  }

  get bassins() {
    return this.dataForm.get('bassins') as FormArray;
  }

  addBassin() {
    this.bassins.push( this.createBassin()  ) ;
  }

  deleteBassin(i) {
    this.bassins.removeAt( i );
  }
}
