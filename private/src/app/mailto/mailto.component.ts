import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMailto } from './models/mailto-models';
import { EmailtoService } from './services/emailto.service';
import { MatSnackBar, MatDrawer } from '@angular/material';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-mailto',
  templateUrl: './mailto.component.html',
  styleUrls: ['./mailto.component.scss']
})
export class MailtoComponent implements OnInit, OnDestroy , AfterViewInit   {


  destroyed$: Subject<any> = new Subject();
  typeChoix: string[] = ['Ok', 'At', 'Ko'];
  typeMode: any[] = [{value: 'l' , text: 'Licencies' }, {value: 'c', text: 'Compétitions'} ];
  typeDatas: IMailto;
 // mode = '';

  public dataForm: FormGroup ;

  quilltoobar = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], ['link'], [{ 'align': [] }], [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  };

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar , private eMailto: EmailtoService ) {

  }

  ngOnInit() {
  this.initForm();

   this.dataForm.get('mode').valueChanges.pipe(
    takeUntil(this.destroyed$)
   ).subscribe(

    (mode: string) => {

        if (mode === 'c') {
          this.dataForm.get('compet').setValidators(Validators.required) ;
          this.dataForm.get('choix').setValidators(Validators.required) ;
          this.dataForm.get('dests').clearValidators();
          console.log( 'ok' );
        } else if (mode === 'l') {
          this.dataForm.get('dests').setValidators(Validators.required) ;
          this.dataForm.get('compet').clearValidators();
          this.dataForm.get('choix').clearValidators();
        }
        this.dataForm.get('dests').updateValueAndValidity();
        this.dataForm.get('compet').updateValueAndValidity();
        this.dataForm.get('choix').updateValueAndValidity();
        this.dataForm.updateValueAndValidity();
      }


  );

    }



  ngAfterViewInit(): void {
       this.eMailto.getdatas().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(

      (datas) =>  this.typeDatas = datas

    );
  }


  private initForm() {
    this.dataForm = this.formBuilder.group({
      from: new FormControl( null , Validators.required),
      compet: new FormControl( null ),
      body: new FormControl( null , [ Validators.required ]) ,
      subject: new FormControl( null , [ Validators.required, Validators.maxLength(5) ]),
      choix: new FormControl( null ),
      dests: new FormControl( null),
      mode: new FormControl( null, Validators.required)
    }
  );

  }


  public sendMail() {

     const v = this.dataForm.getRawValue();
      if ( v.mode === 'c' ) {
        delete v.dests;
      } else {
        delete v.choix;
        delete v.compet;
      }
      delete v.mode;
      console.log( v );
      this.eMailto.sendMail( v ).pipe(
        takeUntil(this.destroyed$)
       ).subscribe(
          ( response )  => { console.log( response ); this.dataForm.reset(); }  ,
          ( err ) =>  {console.log(err.error);
          console.log(err.name);
          console.log(err.message);
          console.log(err.status); },
          ( ) => console.log( 'complete' ) ,
       );
  }






  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }



}
