import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompetitionsService } from './../services/competitions.service';
import { DataCompet } from '../models/data-compet';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';



@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.css']
})
export class CompetitionsEditComponent implements OnInit {


  public dataForm: FormGroup ;

  @Output() quitte = new EventEmitter<Boolean>();

  @Input()
  set data(data: DataCompet) {

       this.dataForm.setValue( data , { onlySelf: true } );
        if ( this.dataForm.get('nb').value  > 0 )   {
        this.dataForm.controls['verif'].disable();
        } else {
          this.dataForm.controls['verif'].enable();
        }
  }

  get data(): DataCompet {
        return this.data;
  }


  constructor(private formBuilder: FormBuilder, private compService: CompetitionsService ) {
    this.createForm() ;

  }

  minDate = new Date();
  maxDate = new Date(2018, 7, 31);


  entr$: Observable<any[]>;

  meta = {
    'bassin': [{'name': '25' , 'value': '25'  } , {'name': '50' , 'value': '50'  }  ] ,
    'type': [{'name': 'Stage' , 'value': 'stage' } , {'name': 'Compétition' , 'value': 'compet'  } ]  };



   ngOnInit() {
    this.entr$  = this.compService.getEnt();
  }

    public setForm( d ) {
      let add = false;
      if ( !d ) {
        d = new DataCompet();
        add = true ;
      }


      this.dataForm.setValue( d , { onlySelf: true } );
      if ( add || this.dataForm.get('nb').value  > 0 )   {
        this.dataForm.controls['verif'].disable();
      } else {
        this.dataForm.controls['verif'].enable();
      }
    }


  doquitte() {
    this.quitte.emit( true );
  }




  saveForm() {


    const data = this.dataForm.getRawValue() ;
    if ( data.id === null ) {
      this.compService.post( data );
      } else {
      this.compService.put( data );
      }
      this.doquitte();

  }

  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      id: new FormControl( null ),
      nom: ['', [Validators.required,  Validators.minLength(5)] ],
      lieu:  ['', [Validators.required, Validators.minLength(4)] ],
      categories: new FormGroup({
        av: new FormControl(false),
        je: new FormControl(false),
        dep: new FormControl(false),
        reg: new FormControl(false),
        nat: new FormControl(false),
        ma: new FormControl(false)
      }, this.catValidator),
      bassin: [ '25' , [Validators.required] ],
      type: [ 'compet' , [ Validators.required ]] ,
      debut: [ null , [Validators.required] ],
      fin: [ null  , [Validators.required] ],
      heure: ['07', [Validators.required] ],
      limite: [ null  , [Validators.required] ],
      nb: new FormControl({value: 0}),
      next: new FormControl({value: true}),
      choixnages: new FormControl({value: false}),
      max: new FormControl(0),
      entraineur:  [ '-'  ],
      lien: new FormControl(null, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
      commentaires: new FormControl(null),
      verif: new FormControl({value: false , disabled: true}),
    },
    {validator: this.allDateValidator  }
  );
  this.setValidator();
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
private catValidator(gcat: FormGroup ) {

  let res = false;
    Object.keys( gcat.controls).forEach(key => {
      if ( gcat.get(key).value ) {
        res = true; }
    });
    if (res) {
      return null;
     } else {
      return {catError: true};
     }
 }
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 private setValidator() {
     this.dataForm.get('type').valueChanges.subscribe(
         (type: string) => {
               if (type === 'compet') {
                this.dataForm.get('max').setValidators(null);
               } else  {
                this.dataForm.get('max').setValidators([Validators.required, Validators.pattern('^[1-9][0-9]*$')]);
               }
                this.dataForm.get('max').updateValueAndValidity();
           }
       );
     }
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 private  allDateValidator(input: FormControl ): any {
       if ( input.get('debut').value === null || input.get('fin').value === null  || input.get('limite').value === null  ) {
         return null;
       }
      const start = Date.parse( input.get('debut').value);
      const end = Date.parse( input.get( 'fin' ).value);
      const limite = Date.parse( input.get( 'limite' ).value);

       return  ( start <=  end && limite < start  ) ?  null :  {dateError: true};
 }


 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 public onDateStart(event: MatDatepickerInputEvent<Date> ) {
   const start = new Date(event.value);
   start.setHours(12);

  this.dataForm.get('debut').setValue( start ) ;

   if ( this.dataForm.get('fin').value === null  ) {
     this.dataForm.get('fin').setValue( start ) ;
  }
   if ( this.dataForm.get('limite').value === null ) {
     const limite = new Date(start);
     limite.setDate( limite.getDate() - 10 );
     this.dataForm.get('limite').setValue( limite ) ;
   }
 }




}
