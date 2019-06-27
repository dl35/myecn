import { ILogin } from './../models/iLogin';
import { Observable, combineLatest, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  filtre = { profile: null , txt: '' };

  profiles = [
    {value: null, viewValue: '-'},
    {value: 'admin' , viewValue: 'admin'},
    {value: 'user', viewValue: 'user'},
    {value: 'ent', viewValue: 'entraineur'}
  ];

  filter$: Observable<any>;
  filteredStates$: Observable<ILogin[]>;
  datas$: Observable<ILogin[]> ;
  dataSelected: ILogin;
  constructor(private uService: UsersService , public dialog: MatDialog) {
  this.datas$ = this.uService.datas$ ;
  this.filter$ = of( this.filtre ) ;
  this.filteredStates$ = combineLatest( [this.datas$, this.filter$] ).pipe(
    map(([s, d]) => s.filter( ts => ts.profile === d.profile ))
  );

  }


  /*
  https://blog.angulartraining.com/dynamic-filtering-with-rxjs-and-angular-forms-a-tutorial-6daa3c44076a
states$: Observable<State[]>;
filteredStates$: Observable<State[]>;
filter: FormControl;
filter$: Observable<string>;

constructor(private http: HttpClient) {
  this.states$ = http.get<State[]>('http://localhost:8000/states');
  this.filter = new FormControl('');
  this.filter$ = this.filter.valueChanges;
  this.filteredStates$ = combineLatest(this.states$, this.filter$).pipe(
    map(([states, filterString]) => states.filter(state => state.name.indexOf(filterString) !== -1))
  );
}
  */
  doFilter() {
// tslint:disable-next-line: max-line-length
console.log( this.filtre.profile ) ;
    this.datas$.pipe( switchMap( item =>   item.filter( d =>   ( this.filtre.profile  === null  ) ? (d) : (  d.profile  === this.filtre.profile ) )) );
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
