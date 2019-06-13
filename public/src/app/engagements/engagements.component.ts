import { EngagementsService } from './services/engagements.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit {




  public dataForm: FormGroup ;
  public ide: string;
  public idl: string;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute , private router: Router ,
                private snackBar: MatSnackBar , private engService: EngagementsService ) {

  }
  destroyed$: Subject<any> = new Subject();
  public data =  null;
  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      commentaire: new FormControl( null )
    });
    this.route.params.pipe( takeUntil(this.destroyed$) ).subscribe(params => {
     if ( params.ide && params.idl )  {
      this.ide = params.ide ; this.idl = params.idl ;
      this.initEngagements() ; }
       }
     );
  }

  private initEngagements() {

    this.engService.getEngagements(this.ide, this.idl).pipe( takeUntil(this.destroyed$) ).subscribe(
      data => {   this.initForm(data)  ;   },
      error => {  this.showSnackBar(error.error.message, false); this.router.navigate(['/']); }
     ) ;
  }

  private initForm( data ) {

    if ( data.valide === false ) {
      this.data = data ;
      return;
    }


  for (const item of data.engage ) {
    let v = null ;
    ( item.presence === 'at' ) ? v = ''  : v = item.presence ;

     this.dataForm.addControl( item.id , new FormControl( v , Validators.required) );
  }


    this.data = data ;
  }

  public quitte() {
    this.router.navigate(['/competitions']);
  }

  public validate() {
      const datas = this.dataForm.getRawValue();


     this.engService.updateEngagements(this.ide, this.idl , datas ).pipe( takeUntil(this.destroyed$) ).subscribe(
      data => {   this.showSnackBar( data.message  , true); this.router.navigate(['competitions']); },
      error => {  this.showSnackBar(error.error.message, false);  }
     ) ;
  }



    private showSnackBar(message, info) {
      // tslint:disable-next-line:no-shadowed-variable
      let style = 'snack-success';
      if (!info) {
        style = 'snack-error';
      }
      this.snackBar.open(message, '', {
        duration: 1500,
        announcementMessage: 'message',
        panelClass: [style]
      });
    }



}
