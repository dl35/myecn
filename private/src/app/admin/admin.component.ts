import { AdminService } from './services/admin.service';
import { Component,  OnDestroy  } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
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
  constructor(public dialog: MatDialog, private adService: AdminService,private snackBar: MatSnackBar ) {
 
  }

  private showSnackBar(message, info) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if (!info) {
      style = 'snack-error';
    }
    this.snackBar.open(message, '', {
      duration: 1500,
      announcementMessage: 'info',
      panelClass: [style]
    });
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
                  this.adService.reinitCompetitions().subscribe(
                      (info) => { this.showSnackBar( info.message  , true ); } ,
                      (error) =>  { this.showSnackBar( error.error.message, false );  }

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
                this.adService.reinitEngagements().subscribe(
                    (info) => { this.showSnackBar( info.message  , true ); } ,
                    (error) =>  { this.showSnackBar( error.error.message, false );  }

                ); }},
     () => { },
     () => {},
   );

}


  ngOnDestroy(): void {

  }

}
