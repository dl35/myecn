import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IMailto } from './models/mailto-models';
import { EmailtoService } from './services/emailto.service';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DiagComponent } from './diag/diag.component';

@Component({
  selector: 'app-mailto',
  templateUrl: './mailto.component.html',
  styleUrls: ['./mailto.component.scss']
})
export class MailtoComponent implements OnInit, OnDestroy , AfterViewInit   {


  diag: MatDialogRef<DiagComponent>;

  loading = true;
  destroyed$: Subject<any> = new Subject();
  typeChoix: string[] = ['Ok', 'At', 'Ko'];
// tslint:disable-next-line: max-line-length
  typeMode: any[] = [ {value: 'c', text: 'Compétitions'},  {value: 'l' , text: 'Licenciés' } , {value: 'g' , text: 'Goupe Licenciés' } , {value: 'i' , text: 'Inscriptions' }  ];
  typeDatas: IMailto;
 

  public dataForm: FormGroup ;

  quilltoobar = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], ['link'], [{ 'align': [] }], [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  };

  constructor(private formBuilder: FormBuilder, private eMailto: EmailtoService, private dialog: MatDialog ) {

  }

  ngOnInit() {
  this.initForm();

   this.dataForm.get('mode').valueChanges.pipe(
    takeUntil(this.destroyed$)
   ).subscribe(

    (mode: string) => {
      this.dataForm.get('subject').enable();
      this.dataForm.get('body').enable();
      this.dataForm.get('body').setValue('');
      this.dataForm.get('subject').setValue('');

        if (mode === 'c') {
          this.dataForm.get('compet').setValidators(Validators.required) ;
          this.dataForm.get('choix').setValidators(Validators.required) ;
          this.dataForm.get('dests').clearValidators();
          this.dataForm.get('choix').setValue(this.typeChoix);
          this.dataForm.get('email').clearValidators();
        } else if (mode === 'l') {
          this.dataForm.get('dests').setValidators(Validators.required) ;
          this.dataForm.get('compet').clearValidators();
          this.dataForm.get('choix').clearValidators();
          this.dataForm.get('email').clearValidators();
        } else if (mode === 'g') {
          this.dataForm.get('dests').setValidators(Validators.required) ;
          this.dataForm.get('compet').clearValidators();
          this.dataForm.get('choix').clearValidators();
          this.dataForm.get('email').clearValidators();
        } else if ( mode === 'i' ) {
          this.dataForm.get('compet').clearValidators();
          this.dataForm.get('choix').clearValidators();
          this.dataForm.get('dests').clearValidators();
          this.dataForm.get('subject').setValue('[Inscription]');
          this.dataForm.get('subject').disable();
          this.dataForm.get('body').setValue(this.typeDatas.ins);
          this.dataForm.get('body').disable();
          this.dataForm.get('email').setValidators([Validators.required, Validators.email]) ;
        }

        this.dataForm.get('dests').updateValueAndValidity();
        this.dataForm.get('compet').updateValueAndValidity();
        this.dataForm.get('choix').updateValueAndValidity();
        this.dataForm.get('email').updateValueAndValidity();

        this.dataForm.updateValueAndValidity();
      }


  );

    }



  ngAfterViewInit(): void {
       this.eMailto.getdatas().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (datas) =>  this.typeDatas = datas ,
      (error) => {},
      () =>  { setTimeout( () => { this.loading = false; }, 1000); }
    );
  }


  private initForm() {
    this.dataForm = this.formBuilder.group({
      from: new FormControl( null , Validators.required),
      body: new FormControl( null , [ Validators.required, Validators.minLength(5) ]) ,
      subject: new FormControl( null , [ Validators.required, Validators.minLength(5) ]),
      choix: new FormControl( null ),
      dests: new FormControl( null),
      compet: new FormControl( null ),
      email: new FormControl( null ),
      mode: new FormControl( null, Validators.required)
    }
  );

  }


  public sendMail() {
     this.loading = true ;
     const v = this.dataForm.getRawValue();
      if ( v.mode === 'c' ) {
        delete v.dests;
        delete v.email;
      } else if ( v.mode === 'l' ||  v.mode === 'g' ) {
        delete v.choix;
        delete v.compet;
        delete v.email;
      } else {
        delete v.choix;
        delete v.compet;
        delete v.dests;
      }
      this.diag = this.dialog.open(DiagComponent, {
        width: '50%',
        disableClose: true
      });

      this.eMailto.sendMail( v ).pipe(
        takeUntil(this.destroyed$)
       ).subscribe(
          ( response )  => { if ( v.mode === 'i' ) { this.dataForm.get('email').reset(); } /*else { this.dataForm.reset(); } */ }  ,
          ( err ) =>  { this.diag.close() ; this.loading = false ;
          // console.log(err.error);
          // console.log(err.name);
          // console.log(err.message);
          // console.log(err.status);
           },
          ( ) => {  this.diag.close() ; this.loading = false ; } ,
       );
  }






  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }



}
