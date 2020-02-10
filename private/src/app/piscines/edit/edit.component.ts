import { PiscinesService } from './../services/piscines.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-edit-piscine',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public dataForm: FormGroup ;

  public allLongueur = [ '25' , '50' ];
  public allCouloirs = [ '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , '11', '12' ];




  // tslint:disable-next-line: max-line-length
  constructor(private dialog: MatDialog , private route: ActivatedRoute , private router: Router , private formBuilder: FormBuilder, private pisService: PiscinesService ) {

    this.createForm() ;
    if ( this.route.snapshot.params.id ) {
    this.route.params.pipe(
      switchMap( p  => this.pisService.get( p.id ))
      ).subscribe(
        (d) =>  { this.initForm( d) ; }
    );

  }

  }



  public dosave() {
    const datas  = this.dataForm.getRawValue();
    if ( this.dataForm.get('id').value  ) {
      const id = this.dataForm.get('id').value ;
      delete datas.id ;
      this.pisService.put(datas , id ).subscribe(
        () =>  this.router.navigate(['/piscines'])

      ) ;


    } else {
      delete datas.id ;
      this.pisService.post(datas).subscribe(
        () =>  this.router.navigate(['/piscines'])
      ) ;


    }

  }



  ngOnInit() {
  }

  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      id: [null],
      libelle: ['', [Validators.required] ],
      adresse:  ['', [Validators.required] ],
      cp: [ null , [ Validators.required , Validators.pattern(/^[0-9]{5}$/) ]] ,
      ville: [ null , [Validators.required] ],
      latitude: [ null  , [Validators.required , Validators.pattern(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/) ] ],
      longitude: [null, [Validators.required , Validators.pattern(/^-?([1]?[1-7][1-9]|[1]?[1-8][0]|[1-9]?[0-9])\.{1}\d{1,6}$/)  ] ],
      bassins: this.formBuilder.array([ this.createBassin() ] )
    }

  );

  }

  private initForm( data) {

    if ( data.bassins.length === 1 ) {
      this.dataForm.patchValue( data );
    } else {
      this.bassins.clear();
      this.dataForm.patchValue( data );
      data.bassins.forEach( b => this.bassins.push(this.formBuilder.group(b) ) );
    }

  }


  createBassin(): FormGroup {
    return this.formBuilder.group({
      longueur:  [ '25' , [Validators.required] ],
      couloirs:  [ '5' , [Validators.required] ]
    });
  }

    public deletePiscine() {
      const id = this.dataForm.get('id').value ;
      if ( ! id ) { return ; }
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '50%',
        data: { id: id , info: 'Voulez vous supprimer ?'  },
        disableClose: true
       });

       dialogRef.beforeClosed().subscribe(
         (result) => {
                  if (result) {
                    this.pisService.delete(id).subscribe(
                      () =>  this.router.navigate(['/piscines'])
                    );
                      } },
         () => {},
         () => {},
       );

    }



  get bassins() {
    return this.dataForm.get('bassins') as FormArray;
  }

  addBassin() {
    this.bassins.push( this.createBassin()  ) ;
  }

  deleteBassin(i) {
    this.bassins.removeAt( i );
  }
}
