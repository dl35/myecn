import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { NiveauService } from '../service/niveau.service';


@Component({
  selector: 'app-edit-niveau',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  @Input()  item: any;
  @Output() hideForm = new EventEmitter();
//  @Output() updateData: EventEmitter<IDataLicencies> = new EventEmitter();

  public dataForm: FormGroup ;
  valide = false;

  meta = {
    niveau: [{'name': 'Dep' , 'value': 'dep' } , {'name': 'Reg' , 'value': 'reg' } , {'name': 'Nat' , 'value': 'nat' }]
  };


  constructor(private formBuilder: FormBuilder, private servNiveau: NiveauService  ) { }

  ngOnInit() {

    console.log (  this.item ) ;
    this.initForm();

  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      id: [ {value: this.item.id , disabled: true} , [Validators.minLength(5), Validators.required] ],
      nom: [ {value: this.item.nom , disabled: true} , [Validators.minLength(1), Validators.required] ],
      prenom:  [ {value: this.item.prenom , disabled: true} , [Validators.minLength(1), Validators.required] ],
      categorie:  [ {value: this.item.categorie , disabled: true} , [Validators.minLength(1), Validators.required] ],
      rang:  [ {value: this.item.rang , disabled: true} , [Validators.minLength(1) , Validators.required] ],
      niveau:  [ this.item.niveau   ]
      });
  }

  cancelForm() {
    this.hideForm.emit( null );
  }
  setSelection($event) {

  if (typeof $event.value === 'undefined' ) {
    $event.value = null ;
  }


   this.valide =  ( $event.value === this.item.niveau ) ?  false : true ;

  }


  validate() {
      const data = this.dataForm.getRawValue();
      this.servNiveau.put( data ).subscribe(
       (resp) => { this.hideForm.emit( data ); },
       (err) => {},
       () => {}

      );

    }


}
