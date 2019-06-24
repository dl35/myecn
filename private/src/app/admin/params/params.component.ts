import { AdminService } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {

  public dataForm: FormGroup ;
  params$: Observable<any[]>;

  constructor(private route: Router, private formBuilder: FormBuilder, private adService: AdminService) {
    this.createForm() ;

   }

  ngOnInit() {

    this.adService.getParams().subscribe( (d) => this.setForm(d) ) ;

  }


  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({

      dev: [null , [Validators.required] ],
      dev_email:  [ null , [Validators.required , Validators.email] ],
      saison_enc: [ null , [Validators.required , Validators.minLength(9) , Validators.maxLength(9)] ],
      saison_last: [ null , [ Validators.required ,   Validators.minLength(9) , Validators.maxLength(9)]] ,
      dateforum: [ null , [Validators.required, Validators.minLength(5)] ],
      tlicencies_encours: [ null  , [Validators.required,   Validators.minLength(4) , Validators.maxLength(4)] ],
      tlicencies_last: [null, [Validators.required,   Validators.minLength(4) , Validators.maxLength(4)] ],
      tlicencies: [ null  , [Validators.required] ],
          });
                 }

  private setForm( d ) {
      this.dataForm.setValue( d , { onlySelf: true } );
                }

  private saveForm() {
      const data = this.dataForm.getRawValue() ;
        this.adService.updateParams (data ).subscribe(
          (value) =>  { this.route.navigate(['admin']); },
          (error) =>  {  }
        );

                }

  private doquitte() {
    this.route.navigate(['admin']);
  }

}
