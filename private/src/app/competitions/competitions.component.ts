import { ActivatedRoute, Router } from '@angular/router';
import { DataCompet } from './models/data-compet';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher, BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { CompetitionsService } from './services/competitions.service';
import { Observable , Subscription, Subject } from 'rxjs';
import { filter , distinctUntilChanged , takeUntil , shareReplay, map, switchMap} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import 'hammerjs';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MessageType, MessageResponse } from './models/message-response';
import { Location, PlatformLocation } from '@angular/common';


/*
@Pipe({
  name: 'searchfilter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter( e =>   (e.nom.toLowerCase() + ' ' + e.lieu.toLowerCase() ) .indexOf( value.toLowerCase() ) !== -1    );

  }

}
*/



@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionsComponent implements OnInit , OnDestroy  {


  @ViewChild('sidenav', {static: false} )
   private sidenav: MatSidenav ;

  filtre = { next: true , type: null, verif: null , txt: '' };

  // searchfilter:searchText
  private searchControl: FormControl;
  public isSmallScreen: false;

  showFiller = false;
  // hideSide = true;
  // mobileQuery: MediaQueryList;
  datas$: Observable<DataCompet[]> ;

//  private _mobileQueryListener: () => void;
//  destroy$: Subject<boolean> = new Subject<boolean>();


  dates = [
    {value: null, viewValue: '-'},
    {value: true, viewValue: 'Futures'},
    {value: false, viewValue: 'Passées'}
  ];
  etats = [
    {value: null, viewValue: '-'},
    {value: true, viewValue: 'Vérifiées'},
    {value: false, viewValue: 'à Vérifier'}
  ];

  types = [
    {value: null, viewValue: '-'},
    {value: 'compet' , viewValue: 'compet'},
    {value: 'stage', viewValue: 'stage'}
  ];

  isMedium$: Observable<BreakpointState>;


// tslint:disable-next-line: max-line-length
  constructor(public breakpointObserver: BreakpointObserver, public dialog: MatDialog, private compService: CompetitionsService, private route: Router) {
   // this.mobileQuery = media.matchMedia('(max-width: 600px)');
   // this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //  this.mobileQuery.addListener(this._mobileQueryListener);
      this.isMedium$ = this.breakpointObserver.observe([ Breakpoints.XSmall , Breakpoints.Small , Breakpoints.Medium ] ) ;
     
  }



  add() {
   this.compService.setMessageData( null );
   this.route.navigate(['competitions/edit'] );
  }

  edit(data) {

  this.compService.setMessageData( data );
  this.route.navigate(['competitions/edit'] );
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
                     console.log( data.id ) ;
                    this.compService.delete( data.id ).subscribe(
                        () => {  this.compService.getListAll();  },
                        () =>  {}

                    ); }},
         () => { },
         () => {},
       );

  }

  doFilter() {
   this.compService.setFiltre( this.filtre );
   this.datas$ = this.compService.getList().pipe(
    map( item =>   item.filter( d =>   ( this.filtre.next  === null  ) ? (d) : (  d.next  === this.filtre.next ) )),
    map( item =>   item.filter( d =>   ( this.filtre.verif === null  ) ? (d) : (  d.verif  === this.filtre.verif ) )),
    map( item =>   item.filter( d =>   ( this.filtre.type  === null  ) ? (d) : (  d.type === this.filtre.type  ) ))
     );


  }

  doFilterInit() {
    this.datas$ = this.compService.getList().pipe(
     map( item =>   item.filter( d =>   ( this.filtre.next  === null  ) ? (d) : (  d.next  === this.compService.filtre.next ) )),
     map( item =>   item.filter( d =>   ( this.filtre.verif === null  ) ? (d) : (  d.verif  === this.compService.filtre.verif ) )),
     map( item =>   item.filter( d =>   ( this.filtre.type  === null  ) ? (d) : (  d.type === this.compService.filtre.type  ) ))
      );
   }

  ngOnInit() {

      this.searchControl = new FormControl('');
      this.filtre = this.compService.filtre ;
      this.compService.getListAll();
      this.doFilterInit();

  }


  ngOnDestroy(): void {
  //  this.mobileQuery.removeListener(this._mobileQueryListener);
  //  this.destroy$.next(true);
  //  this.destroy$.unsubscribe();
  }

}

