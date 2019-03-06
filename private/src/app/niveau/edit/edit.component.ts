import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';


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


  constructor(private formBuilder: FormBuilder  ) { }

  ngOnInit() {

    console.log (  this.item ) ;
    this.initForm();

  }

  initForm() {
    this.dataForm = this.formBuilder.group({
      id: [ {value: this.item.id , disabled: true} ],
      nom: [ {value: this.item.nom , disabled: true} , [Validators.required] ],
      prenom:  [ {value: this.item.prenom , disabled: true} , [Validators.required] ],
      categorie:  [ {value: this.item.categorie , disabled: true} , [Validators.required] ],
      rang:  [ {value: this.item.rang , disabled: true} , [Validators.required] ],
      niveau:  [ this.item.niveau   ]
      });
  }

  cancelForm() {
    this.hideForm.emit( true );
  }
  setSelection($event) {
console.log($event.value , this.item.niveau  ) ;

   this.valide =  ( $event.value === this.item.niveau ) ?  false : true ;

  }

}
