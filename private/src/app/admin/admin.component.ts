import { AdminService } from './services/admin.service';
import { Component,  OnDestroy, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {


   mode = null;
  loading = false;
  constructor(public dialog: MatDialog, private adService: AdminService , private route: Router ) {

  }

  ngOnInit() {
    this.adService.getParams().subscribe( (d) => (d.dev === '0' ) ? this.mode = 'PROD'  : this.mode = 'DEV' ) ;
  }
  public addtest() {
    this.adService.addTest().subscribe() ;
  }
  public deltest() {
    this.adService.delTest().subscribe() ;
  }

  getdoc() {
    window.open('/api/public/scripts/doc.pdf' , '_blank' );
  }
  public delinscrit() {

    this.route.navigate(['admin/invalid']);

}

  public setParams() {

      this.route.navigate(['admin/params']);

  }

  public deleteCompetitions() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '50%',
      data: { info: 'Reinitialiser les compétitions ?'  },
      disableClose: true
     });

     dialogRef.beforeClosed().subscribe(
       (result) => {
                 if (result) {
                  this.adService.clearCompetitions().subscribe(
                      () => {  } ,
                      () =>  { }

                  ); }},
       () => { },
       () => {},
     );

}

public deleteEngagements() {
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    width: '50%',
    data: { info: 'Reinitialiser les engagements ?'  },
    disableClose: true
   });

   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.adService.clearEngagements().subscribe(
                    () => { } ,
                    () =>  {  }

                ); }},
     () => { },
     () => {},
   );

}
public prepare() {
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    width: '50%',
    data: { info: 'Préparer la table licenciés ?'  },
    disableClose: true
   });

   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.adService.prepareTableLicencies().subscribe(
                    () => { } ,
                    () =>  {  }

                ); }},
     () => { },
     () => {},
   );

}

public toRappel() {
  this.route.navigate(['admin/rappel']);
}

public toNouveau() {
  this.route.navigate(['admin/nouveau']);
}

public toAncien() {
  this.route.navigate(['admin/ancien']);
}



public send() {
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    width: '50%',
    data: { info: 'Envoyer les Inscriptions ?'  },
    disableClose: true
   });

   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.adService.sendInscriptions().subscribe(
                    () => { } ,
                    () =>  {  }

              ); }},
     () => { },
     () => {},
   );

}




  ngOnDestroy(): void {

  }

}
