import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input()
  item: any;

  @Output() hideForm = new EventEmitter();
  public dataForm: FormGroup ;
  meta = {
    displayForm : false ,
    rang: ['-' , '1', '2', '3', '4' ],
    banque: ['CA', 'CMB'],
    officiel: ['Non', 'A', 'B', 'C'],
    sexe: ['F', 'H'] ,
    type: [{'name': 'Ren' , 'value': 'R' } , {'name': 'Nou' , 'value': 'N' } ] ,
    niveau: [{'name': 'Dep' , 'value': 'Dep' } , {'name': 'Reg' , 'value': 'Reg' } , {'name': 'Nat' , 'value': 'Nat' }] ,
    // tslint:disable-next-line:max-line-length
    categorie: [{'name': '-' , 'value': '-' } , {'name': 'Avenir' , 'value': 'AV' } , {'name': 'Jeune' , 'value': 'JE' } , {'name': 'Junior' , 'value': 'JU' }, {'name': 'Senior' , 'value': 'SE' }, {'name': 'Master' , 'value': 'MA' }] ,
    total : 0,
    totdisp : 0
  };


  maxDate: Date;
  minDate: Date;
  startDate: Date;


  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.initForm();
    this.initDatas();
  }

  initForm() {

    this.dataForm = this.formBuilder.group({
      id: ['-1' ],
      nom: [ null , [Validators.required] ],
      prenom:  [ null , [Validators.required] ],
      date:  [ new Date() , [Validators.required] ],
      sexe:  [ null , [Validators.required] ],

      categorie:  [ null , [Validators.required] ],
      rang:  [ null  , [Validators.required] ],
      officiel:  [ null   ],
      entr:  [ null  ],



      adresse:  [ null , [Validators.required] ],
      code_postal:  [ null , [Validators.required] ],
      ville:  [ null  , [Validators.required] ],

      telephone1:  [ null , [Validators.required] ],
      telephone2:  [ null ],
      telephone3:  [ null ],

      // tslint:disable-next-line:max-line-length
      email1:  [ null , [Validators.required , Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ] ],
      email2:  [ null  , [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ]],
      // tslint:disable-next-line:max-line-length
      email3:  [ null  , [Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ]],
      licence:  [ null  ],

      commentaires:  [ null  ],

      carte:  [ '0' ],

      auto_parentale:  [ false  ] ,
      cert_medical:  [ false  ],
      fiche_medicale:  [ false  ],
      photo:  [ false  ],
      paye:  [ false  ],
      reglement:  [ false  ],
      tarif:  [ null  ],
      cotisation: new FormControl({value: '', disabled: true }) ,
      especes:  [ 0.0  ],
      cheque1:  [ null  ],
      cheque2:  [ null  ],
      cheque3:  [ null ],
      ch_sport:  [null],
      coup_sport:  [null],
      num_cheque1:  [null],
      num_cheque2:  [null],
      num_cheque3:  [null],
      num_sport:  [null],
      num_coupsport:  [null],
      nbre_chvac10:  [null],
      nbre_chvac20:  [null],
      banque:  [null],
      type:  [ 'N' , [Validators.required]  ],
      valide:  [ false  ],








    });

//     this.customValidator();
  }

initDatas ( ) {

  if ( this.item !== null   ) {
    delete this.item.params;
      this.dataForm.setValue( this.item );  /// , { onlySelf: true });
      this.startDate = new Date( this.dataForm.get('date').value  );
  } else {
    this.dataForm.reset();
    this.startDate = new Date();
    const dstart = ( new Date().getFullYear() )  - 10 ;
    this.startDate.setFullYear ( dstart ) ;
    this.dataForm.get('type').setValue('N');
    this.dataForm.get('id').setValue('-1');

  }

  }

cancelForm() {
  this.hideForm.emit( true );

}



}
