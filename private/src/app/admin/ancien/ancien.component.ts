import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatasService } from '../services/datas.service';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-ancien',
  templateUrl: './ancien.component.html',
  styleUrls: ['./ancien.component.scss']
})
export class AncienComponent implements OnInit {

  body$: Observable<any>;
  subject$ = new Subject<any>();
  public dataForm: FormGroup ;


  quilltoobar = {
    formula: false,
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
  //  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    //  [{'direction': 'rtl'}],                         // text direction

      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    //  [{'font': []}],
      [{'align': []}],
      ['clean'],                                       // remove formatting button
      ['link']                   // link and image, video
    ]
  };

  constructor(private route: Router, private formBuilder: FormBuilder , private datasService: DatasService ) { }

  ngOnInit() {
    this.createForm();

      this.body$ = this.subject$.pipe(
      startWith(''),
      switchMap( v  => this.datasService.getAncien() ),
      tap( (v) => this.dataForm.get('body').setValue(v) )
    );

      this.subject$.next('ok');

  }

  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      body: [null , [Validators.required] ],
    }); }

    refresh() {
      this.subject$.next( 'refresh' );
    }

    public saveForm() {
      const data = this.dataForm.getRawValue() ;
        this.datasService.saveAncien( data ).subscribe(
          (value) =>  { /* this.route.navigate(['admin']);*/ },
          (error) =>  {  }
        );

                }

  public doquitte() {
    this.route.navigate(['admin']);
  }

}
