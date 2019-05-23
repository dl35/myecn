import { ILogin } from './../models/iLogin';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  datas$: Observable<ILogin[]> ;
  dataSelected: ILogin;
  constructor(private uService: UsersService , public dialog: MatDialog) {
  this.datas$ = this.uService.datas$ ;

  }



  ngOnInit() {
    this.uService.get();
  }

  edit( data) {
    this.dataSelected = data ;
  }

  add() {
    const d: ILogin  = {'id' : '-1' , 'user': '' , 'passwd': '' , 'profile': 'user'};
    this.dataSelected = d ;
  }



  delete( data ) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '50%',
      data: { id: data.id , info: 'Voulez vous supprimer ' + data.user + ' ?'  },
      disableClose: true
     });

     dialogRef.beforeClosed().subscribe(
       (result) => {
                 if (result) {
                  this.uService.delete( data.id );
                   } },
       () => {},
       () => {},
     );

}



tomail( data ) {
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    width: '50%',
    data: { id: data.id , info: 'Identifiants par email :' + data.user + ' ?'  },
    disableClose: true
   });

   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.uService.sendMail( data.id ).subscribe();

                 } },
     () => {},
     () => {},
   );

}



}
