import { RecordsService } from './../services/records.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageResponse } from 'src/app/engagements/models/data-engage';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IRecords } from '../models/models-records';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-records',
  templateUrl: './edit-records.component.html',
  styleUrls: ['./edit-records.component.scss']
})
export class EditRecordsComponent implements OnInit {

  names$: Observable<any[]>;
  public types = ['CLUB' , 'DEP' , 'REG' , 'NAT'] ;

  @Output() quitte = new EventEmitter<Boolean>();
  public dataForm: FormGroup ;

  @Input()
  set data(data: IRecords) {

       delete data.modif;


       this.dataForm.setValue( data , { onlySelf: true } );
  }
/*
  get data(): Irecords {
    // transform value for display
        return this.data;
  }*/

  constructor(private formBuilder: FormBuilder, private recService: RecordsService ) { 

    this.createForm();

  }

  ngOnInit() {
   this.names$ = this.recService.getName().pipe(
    map( data => data.filter( item => item.sexe === 'H' )  )

   );
console.log( this.names$ );


  }
  doquitte() {
    this.quitte.emit( true );
  }

  saveForm() {
    const data = this.dataForm.getRawValue() ;
    this.quitte.emit( true );
  }

  private createForm() {
    this.dataForm = this.formBuilder.group({
      age: [ {value: null , disabled: true} , [Validators.required ] ],
      nom: ['', [Validators.required] ],
      prenom:  ['', [Validators.required] ],
      lieu:  [''],
      bassin: [ '25' , [Validators.required] ],
      date: [ null , [Validators.required] ],
      distance: ['50', [Validators.required] ],
      sexe: [ 'F', [Validators.required] ],
      type:  [ 'CLUB' , [Validators.required] ],
      nage:  [ 'NL' , [Validators.required] ],
      points:  [ 0 , [Validators.required , Validators.min(0)] ],
      temps:  [ 0 , [Validators.required , Validators.min(0) ] ]
    }
  );
  }
}




