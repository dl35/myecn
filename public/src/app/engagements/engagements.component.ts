import { EngagementsService } from './services/engagements.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AdhesionService } from '../adhesion/services/adhesion.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit {



  public dataForm: FormGroup ;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute , private router: Router ,
                private snackBar: MatSnackBar , private engService: EngagementsService ) {

  }
  destroyed$: Subject<any> = new Subject();
  public data =  null;
  ngOnInit() {
    this.dataForm = this.formBuilder.group({});
    this.route.params.pipe( takeUntil(this.destroyed$) ).subscribe(params => {
     if ( params.ide && params.idl )  { this.initEngagements( params.ide , params.idl ) ; }
       }
     );
  }

  private initEngagements( id , idlic ) {

    this.engService.getEngagements(id, idlic).pipe( takeUntil(this.destroyed$) ).subscribe(
      data => {   this.initForm(data)  ;   },
      error => {  this.showSnackBar(error.error.message, false); this.router.navigate(['/']); }
     ) ;
  }

  private initForm( data ) {
  //  this.dataForm = this.formBuilder.group({});
  for (const item of data.engage ) {
    console.log( item.id );
    this.dataForm.addControl( item.id , new FormControl('', Validators.required) );
  }

    this.data = data ;
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



}
