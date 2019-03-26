import { Observable } from 'rxjs';
import { IBanque } from './../models/data-licencies';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { LicenciesService } from '../services/licencies.service';
import { IDataLicencies } from '../models/data-licencies';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  show = false ;

  banques$: Observable<IBanque[]> ;


  @Input()
  item: any;

  @Output() hideForm = new EventEmitter();
  @Output() addData: EventEmitter<IDataLicencies> = new EventEmitter();
  @Output() updateData: EventEmitter<IDataLicencies> = new EventEmitter();

  public dataForm: FormGroup ;
  meta = {
    displayForm : false ,
    rang: ['1', '2', '3', '4' , 'C1' , 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C10', 'C12'],
    officiel: ['A', 'B', 'C'],
    sexe: ['F', 'H'] ,
    type: [{'name': 'Ren' , 'value': 'R' } , {'name': 'Nou' , 'value': 'N' } ] ,
    niveau: [{'name': 'Dep' , 'value': 'Dep' } , {'name': 'Reg' , 'value': 'Reg' } , {'name': 'Nat' , 'value': 'Nat' }] ,
    // tslint:disable-next-line:max-line-length
    categorie: [ {'name': 'Avenir' , 'value': 'av' } , {'name': 'Jeune' , 'value': 'je' } , {'name': 'Junior' , 'value': 'ju' }, {'name': 'Senior' , 'value': 'se' }, {'name': 'Master' , 'value': 'ma' }] ,
    total : 0,
    totdisp : 0
  };


  maxDate: Date;
  minDate: Date;
  startDate: Date;


  constructor(private formBuilder: FormBuilder , private lserv: LicenciesService  ) { }

  ngOnInit() {
    this.initForm();
    this.initDatas();

    this.banques$ = this.lserv.getBanques();



  }

  initForm() {

    const day = new Date();
    day.setHours(12);

    this.dataForm = this.formBuilder.group({
      id: ['-1'],
      nom: [ null , [Validators.required] ],
      prenom:  [ null , [Validators.required] ],
      date:  [ day , [Validators.required] ],
      sexe:  [ null , [Validators.required] ],

      categorie:  [ null , [Validators.required] ],
      rang:  [ null  , [Validators.required] ],
      officiel:  [ null ],
      entr:  [ null  ],



      adresse:  [ null , [Validators.required] ],
      code_postal:  [ null , [Validators.required, Validators.pattern(/^[0-9]{5}$/)]  ],
      ville:  [ null  , [Validators.required] ],

      telephone1:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],
      telephone2:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],
      telephone3:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],

      email1:  [ null , [ Validators.email ] ],
      email2:  [ null  , [ Validators.email ] ],
      email3:  [ null  , [ Validators.email ] ],

      licence:  [ null  ],

      commentaires:  [ null  ],

      carte:  [ '0' ],

      auto_parentale:  [ false  ] ,
      cert_medical:  [ false  ],
      fiche_medicale:  [ false  ],
      photo:  [ false  ],
      paye:  [ false  ],
      reglement:  [ false  ],
      tarif:  [ null , [Validators.required]  ],
      cotisation: new FormControl({value: '', disabled: true }) ,
      especes:  [ 0.0],
      cheque1:  [ null ],
      cheque2:  [ null ],
      cheque3:  [ null ],
      ch_sport:  [ null ],
      coup_sport:  [ null ],
      num_cheque1:  [ null ],
      num_cheque2:  [ null ],
      num_cheque3:  [ null ],
      num_sport:  [ null ],
      num_coupsport:  [ null ],
      nbre_chvac10:  [ null ],
      nbre_chvac20:  [ null ],
      banque:  [ null ],
      type:  [ 'N' , [Validators.required]  ],
      valide:  [ false ],



    });

    this.dataForm.setValidators( [this.emailsValidator , this.telsValidator ] ) ;
  }

  private  telsValidator( formGroup ): any {
    const tel1 = formGroup.get('telephone1');
    const tel2 = formGroup.get('telephone2');
    const tel3 = formGroup.get('telephone3');
    if ( tel1.value && tel1.value.match(/^[0-9]{10}$/) ) {
      return null;
    }
    if ( tel2.value && tel2.value.match(/^[0-9]{10}$/) ) {
      return null;
    }
    if ( tel3.value && tel3.value.match(/^[0-9]{10}$/) ) {
      return null;
    }
     return { required: true };

}

  private  emailsValidator( formGroup ): any {
    const email1 = formGroup.get('email1');
    const email2 = formGroup.get('email2');
    const email3 = formGroup.get('email3');
    if ( email1.value && !Validators.email(email1) ) {
      return null;
    }
    if ( email2.value && !Validators.email(email2) ) {
      return null;
    }
    if ( email3.value && !Validators.email(email3) ) {
      return null;
    }
     return { required: true };

}





initDatas ( ) {

  if ( this.item !== null   ) {
    delete this.item.params;
    this.show = false;
    this.dataForm.setValue( this.item );
    this.startDate = new Date( this.dataForm.get('date').value  );
    this.dataForm.get('nom').disable();

    if ( this.item.valide ) {
    this.dataForm.get('paye').disable();
    this.dataForm.get('cert_medical').disable();
    }


  } else {
    this.dataForm.reset();
    this.show = true;
    this.startDate = new Date();
    const dstart = ( new Date().getFullYear() )  - 10 ;
    this.startDate.setFullYear ( dstart ) ;
    this.dataForm.get('type').setValue('N');
    this.dataForm.get('id').setValue('-1');
    this.dataForm.get('nom').enable();
  }

  }

cancelForm() {
  this.hideForm.emit( true );

}


saveForm() {
const datas = this.dataForm.getRawValue();
if ( datas.id === '-1' ) {
  this.lserv.add( datas ).subscribe(
     (data) => { this.addData.emit( data );  },
         () => { this.hideForm.emit( true ); }
    );
} else {
  this.lserv.update( datas ).subscribe(
    (data) => { this.updateData.emit( data ); },
       ()  => { this.hideForm.emit( true );   }

   );
}
}



}
