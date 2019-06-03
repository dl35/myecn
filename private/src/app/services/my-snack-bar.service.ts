import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MySnackBarService {

  constructor(public snackBar: MatSnackBar) {}

  public showSnackBar( message , err ) {

   const style =  ( err ) ? 'snack-error' : 'snack-success';

    this.snackBar.open( message  , '', {
      duration: 1500,
      announcementMessage : 'info',
      panelClass: [ style ]
    });
  }

}
