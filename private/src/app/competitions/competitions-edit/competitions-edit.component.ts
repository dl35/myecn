import { CompetitionsService } from './../services/competitions.service';
import { DataCompet } from '../models/data-compet';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material';



@Component({
  selector: 'app-competitions-edit',
  templateUrl: './competitions-edit.component.html',
  styleUrls: ['./competitions-edit.component.css']
})
export class CompetitionsEditComponent implements OnInit {

  //@Input() data: DataCompet;

  @Output() quitte = new EventEmitter<boolean>();

  public dataForm: FormGroup ;


  
  @Input()
  set data(data: DataCompet) {
   
       this.dataForm.setValue( data , { onlySelf: true } );
      if ( this.dataForm.get('verif').value  ===  true   )   {
          this.dataForm.controls['verif'].disable();
        } else {
          this.dataForm.controls['verif'].enable();
        }
      
  }

  get data(): DataCompet {
    // transform value for display
        return this.data;
  }


  constructor(private formBuilder: FormBuilder, private compService: CompetitionsService ) {
    this.createForm() ;

  }

  minDate = new Date(2017, 8, 1);
  maxDate = new Date(2018, 7, 31);

  meta = {
    // displayForm : false ,
    'bassin': [{'name': '25' , 'value': '25'  } , {'name': '50' , 'value': '50'  }  ] ,
    'type': [{'name': 'Stage' , 'value': 'stage' } , {'name': 'Compétition' , 'value': 'compet'  } ]  };


  ngOnInit() {
console.log( 'create form NgInit  '  );
   
  }
  doquitte() {
    this.quitte.emit(true);
  }

  saveForm() {
    this.compService.store ( this.dataForm  );
  }


  setVerif() {

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
      del: new FormControl({value: false}),
      choixnages: new FormControl({value: false}),
      max: new FormControl(0),
      entraineur:  [ null , [Validators.required] ],
      lien: new FormControl(null, Validators.pattern('')),
      commentaires: new FormControl(null),
      verif: new FormControl({value: false , disabled: false}),
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
 private onDateStart(event: MatDatepickerInputEvent<Date> ) {
   const start = new Date(event.value);
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
