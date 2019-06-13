import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { LicenciesService } from '../services/licencies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public dataForm: FormGroup ;
  meta = {
    sexe: ['F', 'H']
  };

  maxDate: Date;
  minDate: Date;
  startDate: Date;

  constructor(private route: Router , private formBuilder: FormBuilder , private lserv: LicenciesService  ) { }


  ngOnInit() {
    this.initForm();
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

      adresse:  [ null , [Validators.required] ],
      code_postal:  [ null , [Validators.required, Validators.pattern(/^[0-9]{5}$/)]  ],
      ville:  [ null  , [Validators.required] ],

      telephone1:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],
      telephone2:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],
      telephone3:  [ null , [Validators.pattern(/^[0-9]{10}$/)] ],

      email1:  [ null , [ Validators.email ] ],
      email2:  [ null  , [ Validators.email ] ],
      email3:  [ null  , [ Validators.email ] ],


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
cancelForm() {
  this.route.navigate(['/licencies']);
}
saveForm() {
 const datas = this.dataForm.getRawValue();
  this.lserv.add( datas ).subscribe(
     (data) => { this.route.navigate(['/licencies']); },
         () => {  }
    );
}


}
