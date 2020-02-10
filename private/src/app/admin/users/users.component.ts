import { ILogin , Ifilter } from './../models/iLogin';
import { Observable, combineLatest, of, BehaviorSubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {

  filtre: Ifilter = { profile: null , user: ''} ;


  profiles = [
    {value: null, viewValue: '-'},
    {value: 'admin' , viewValue: 'admin'},
    {value: 'user', viewValue: 'user'},
    {value: 'ent', viewValue: 'entraineur'}
  ];

  subject$ = new BehaviorSubject(this.filtre);
  filteredStates$: Observable<ILogin[]>;
  datas$: Observable<ILogin[]> ;


  dataSelected: ILogin;
  constructor(private uService: UsersService , public dialog: MatDialog) {


  }

  ngOnInit() {
    this.uService.get();
    this.datas$ = this.uService.datas$ ;

    this.filteredStates$ = combineLatest( [this.datas$, this.subject$] ).pipe(
       map(([s, d]) =>   this.myfiltre( s , d ) )
     );


  }
  clearfiltre() {
    this.filtre.user = '' ;
    this.subject$.next(this.filtre);
  }
  tokeyup( value ) {
      this.subject$.next(this.filtre);
  }


  myfiltre(s , d ) {
    if (d.profile) {
      s = s.filter( ts => ts.profile === d.profile );
    }
    if (d.user) {
      s = s.filter( n => n.user.indexOf(d.user.toLowerCase()) !== -1 );
    }
    return s;

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


ngOnDestroy(): void {

    this.subject$.next({ profile: null , user: ''});
    this.subject$.complete();

  }

}
