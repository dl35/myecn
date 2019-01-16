import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { IMessageResponse, AdhesionService } from './services/adhesion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-adhesion',
  templateUrl: './adhesion.component.html',
  styleUrls: ['./adhesion.component.scss']
})
export class AdhesionComponent implements OnInit , OnDestroy {


  public dataForm: FormGroup ;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute , private router: Router ,
                private snackBar: MatSnackBar , private adhesion: AdhesionService ) {

  }
  destroyed$: Subject<any> = new Subject();
  private id =  null;
  ngOnInit() {
    this.initForm();
    this.route.params.pipe( takeUntil(this.destroyed$) ).subscribe(params => {
     if ( params.id )  { this.initLicencies(params.id ) ; }
       }
     );
  }

  private initLicencies( id ) {

    this.adhesion.getLicencies(id).pipe( takeUntil(this.destroyed$) ).subscribe(
      data => { this.id = id ; this.dataForm.setValue( data ) ; },
      error => {  this.showSnackBar(error.error.message, false); this.router.navigate(['/']); }
     ) ;
  }

  private sendAdhesion() {
    const data = this.dataForm.getRawValue();
    if ( this.id ) {
      this.adhesion.updateLicencies(this.id, data).pipe( takeUntil(this.destroyed$) ).subscribe(
        res => { this.showSnackBar(res.message, true);  this.router.navigate(['/']); } ,
        error => {  this.showSnackBar(error.error.message, false);  }
       ) ;
    } else {

      this.adhesion.addLicencies(data).pipe( takeUntil(this.destroyed$) ).subscribe(
        res => { this.showSnackBar(res.message, true);  } ,
        error => { this.showSnackBar(error.error.message, false);  }
       ) ;
    }

  }
  private initForm() {
    this.dataForm = this.formBuilder.group({
      nom: new FormControl( null , Validators.required),
      prenom: new FormControl( null , [ Validators.required]),
      sexe: new FormControl( null , [ Validators.required]),
      date: new FormControl( null , [ Validators.required]),
      cp: new FormControl( null , [ Validators.required, Validators.pattern(/^[0-9]{1,5}$/)] ),
      adresse: new FormControl( null , [ Validators.required]),
      ville: new FormControl( null , [ Validators.required]),
      email1: new FormControl( null , [ Validators.email]),
      email2: new FormControl( null,  [Validators.email]),
      email3: new FormControl( null , [Validators.email]),
      tel1: new FormControl( null, [ Validators.required, Validators.pattern(/^[0-9]{1,10}$/)]),
      tel2: new FormControl( null, [ Validators.pattern(/^[0-9]{1,10}$/)]),
      tel3: new FormControl( null, [ Validators.pattern(/^[0-9]{1,10}$/)])
    }
  //  {validator: this.emailsValidator  }
  );

      this.dataForm.setValidators( this.emailsValidator ) ;

  }

  private  emailsValidator( formGroup ): any {
    console.log('ok');
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

  private showSnackBar(message, info) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if (!info) {
      style = 'snack-error';
    }
    this.snackBar.open(message, '', {
      duration: 1500,
      announcementMessage: 'denis',
      panelClass: [style]
    });
  }


  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }




}
