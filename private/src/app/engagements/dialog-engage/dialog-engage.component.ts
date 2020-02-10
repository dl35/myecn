import { LicEngage } from './../models/data-engage';
import { EngageService } from './../services/engage.service';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { map } from 'leaflet';

@Component({
  selector: 'app-dialog-engage',
  templateUrl: './dialog-engage.component.html',
  styleUrls: ['./dialog-engage.component.scss']
})
export class DialogEngageComponent implements OnInit {

  public dataForm: FormGroup ;
  public lic: FormControl ;
  datasLic: LicEngage[] ;
  public item: any ;
  public oldeng = [];

  constructor(private formBuilder: FormBuilder , private eService: EngageService , public dialogRef: MatDialogRef<DialogEngageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }




  ngOnInit() {


    if ( this.data.mode === 'add' ) {
        this.lic = new FormControl(null, Validators.required );
      /*  this.eService.getLicencies( this.data.id ).subscribe(
          (datas) => this.datasLic = datas
       ); */

  } else if ( this.data.mode === 'modif' ) {
    this.oldeng = JSON.parse(JSON.stringify( this.data.item.eng ));

  }

  }

  private update() {
      const datas = {ids :  this.lic.value  } ;
      this.eService.updateLicencies( this.data.id , datas ).subscribe(
        (v) => this.dialogRef.close(true)

      );
  }

  private filterLic( value ) {
    this.lic.reset();

    this.eService.getLicencies( this.data.id )
           .subscribe(
          (datas) => { this.datasLic = datas.filter ( v => v.categorie === value )  ; },
          (err) => {  console.log(err) ; }
       );
  }

  public next( v  , r ) {

    if ( r === 'oui' ) {
      r = 'non'; } else if ( r === 'non' ) {
      r = 'oui'; } else {
      r = 'oui' ; }
      this.data.item.eng.forEach(e => {
        if ( e.day === v ) {
          e.presence = r ;
        }

});

  }

  public cancelModif() {
      this.data.item.eng = JSON.parse(JSON.stringify( this.oldeng ));
      this.oldeng = [] ;
  }


public saveModif() {
  const datas = { eng : this.data.item.eng  , idl : this.data.item.id_licencies  };
  this.eService.modifLicencies( this.data.item.id , datas ).subscribe(
    (v) => this.dialogRef.close(true)

  );

}

}
