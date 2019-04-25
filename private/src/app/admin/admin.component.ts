import { AdminService } from './services/admin.service';
import { Component,  OnDestroy  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

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
export class AdminComponent implements OnDestroy {


  loading = false;
  constructor(public dialog: MatDialog, private adService: AdminService ) {

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
