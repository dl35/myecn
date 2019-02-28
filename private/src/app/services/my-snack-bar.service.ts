import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MySnackBarService {

  constructor(public snackBar: MatSnackBar) { 
  }

  public showSnackBar( message , err ) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if ( err ) {
      style = 'snack-error';
    }
    this.snackBar.open( message  , '', {
      duration: 1500,
      announcementMessage : 'denis',
      panelClass: [ style ]
    });
  }

}
