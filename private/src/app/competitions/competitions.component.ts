import { DataCompet } from './models/data-compet';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { CompetitionsService } from './services/competitions.service';
import { Observable , BehaviorSubject, combineLatest } from 'rxjs';
import { map} from 'rxjs/operators';

import 'hammerjs';
import { MatDialog } from '@angular/material/dialog';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';



@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionsComponent implements OnInit , OnDestroy  {



  filtre = { next: 'true' , type: null, verif: null , txt: '' };

  public isSmallScreen: false;

  showFiller = false;
  datas$: Observable<DataCompet[]> ;
  filteredStates$: Observable<DataCompet[]>;

  subject$ = new BehaviorSubject(this.filtre);
  dataSelected = null;

  dates = [
    {value: null, viewValue: '-'},
    {value: 'true', viewValue: 'Futures'},
    {value: 'false', viewValue: 'Passées'}
  ];
  etats = [
    {value: null, viewValue: '-'},
    {value: 'true', viewValue: 'Vérifiées'},
    {value: 'false', viewValue: 'à Vérifier'}
  ];

  types = [
    {value: null, viewValue: '-'},
    {value: 'compet' , viewValue: 'compet'},
    {value: 'stage', viewValue: 'stage'}
  ];


  layoutChanges: Observable<BreakpointState>;

// tslint:disable-next-line: max-line-length
  constructor(public breakpointObserver: BreakpointObserver, public dialog: MatDialog, private compService: CompetitionsService) {
      this.layoutChanges = this.breakpointObserver.observe([
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]);
  }


  ngOnInit() {

      this.datas$ = this.compService.getList();
      this.filteredStates$ = combineLatest( [this.datas$, this.subject$] ).pipe(
        map(([s, d]) =>   this.myfiltre( s , d ) )
      );

  }

  myfiltre(s , d ) {

    if (d.next) {
      s = s.filter( ts => String(ts.next) === d.next );
    }
    if (d.type) {
      s = s.filter( ts => ts.type === d.type );
    }
    if (d.verif) {

      s = s.filter( ts => String(ts.verif) === d.verif );
    }



    return s;

  }

  add() {
   this.dataSelected = new DataCompet() ;
  }

  edit(data) {
  this.dataSelected = data ;
  }

  delete(data) {
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
        width: '50%',
        data: { id: data.id , info: 'Voulez vous supprimer ' + data.nom + ' ?'  },
        disableClose: true
       });

       dialogRef.beforeClosed().subscribe(
         (result) => {
                  if (result) {
                       this.compService.delete( data.id );
                      } },
         () => {},
         () => {},
       );

  }



  ngOnDestroy(): void {
  //  this.mobileQuery.removeListener(this._mobileQueryListener);
  //  this.destroy$.next(true);
  //  this.destroy$.unsubscribe();
  }

}

