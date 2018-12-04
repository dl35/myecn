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
  mode = '';

  public dataForm: FormGroup ;

  quilltoobar = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], ['link'], [{ 'align': [] }], [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  };

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar , private eMailto: EmailtoService ) {

  }

  ngOnInit() {
this.initFormC();



  }
  ngAfterViewInit(): void {
       this.eMailto.getdatas().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(

      (datas) =>  this.typeDatas = datas

    );
  }


  private initFormC() {
    this.dataForm = this.formBuilder.group({
      from2: new FormControl('' , Validators.required),
      dests: this.formBuilder.array([] , Validators.required),
      compet: new FormControl('' , Validators.required),
      choix: this.formBuilder.array([] , Validators.required),
    }
  );

  }

  private initFormL() {
    this.dataForm = this.formBuilder.group({
      from: this.formBuilder.array([], Validators.required),
      dests: this.formBuilder.array([], Validators.required),
    }
  );

  }
public setMode( value ) {
console.log( value );
  // ( value === 'c' ) ? this.initFormC() : this.initFormL();

}

  public sendMail() {

     const v = this.dataForm.getRawValue();
     console.log( v ) ;



  }






  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }



}
