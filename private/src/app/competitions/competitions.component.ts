import { ActivatedRoute, Router } from '@angular/router';
import { DataCompet } from './models/data-compet';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CompetitionsService } from './services/competitions.service';
import { Observable , Subscription, Subject } from 'rxjs';
import { filter , distinctUntilChanged , takeUntil , shareReplay} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import 'hammerjs';
import { MatDrawer, MatDialog } from '@angular/material';

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

  filtreEtat = [null, true, false];
  filtre = { next: true, type: null, verif: null , txt: '' };


  // searchfilter:searchText
   @ViewChild('mdrawer') mdrawer: MatDrawer;
  private searchControl: FormControl;

 


  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  datas$: Observable<DataCompet[]> ;
  dataSelected: DataCompet;


  private _mobileQueryListener: () => void;
  destroy$: Subject<boolean> = new Subject<boolean>();



  constructor(public dialog: MatDialog,  changeDetectorRef: ChangeDetectorRef,
               media: MediaMatcher, private compService: CompetitionsService, private route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

 

  }

  switchdrawer() {

    this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open() ;

  }


  add() {

  //  console.log('denis:' , this.dataSelected) ;
   // this.dataSelected = new DataCompet() ;
   this.compService.setMessageData( null );
   this.route.navigate(['competitions/edit'] );
  }

  edit(data) {
 //   this.dataSelected = data ;

this.compService.setMessageData( data );
  this.route.navigate(['competitions/edit'] );
  // ,  { queryParams: { data: data }, skipLocationChange: true } );
 // this.route.navigateByUrl('/competitions/edit', { state: { hello: 'world' } });
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
                    this.compService.delete( data.id ).subscribe(
                        () => { this.compService.updateCache('delete', data); },
                        () =>  {}

                    ); }},
         () => { },
         () => {},
       );

  }




  onQuitte(message: MessageResponse) {
  this.dataSelected = null;
  if ( message.type === MessageType.NONE ) {  return ; }
  }


  doFilter(value) {

    if (value === 'verif') {
      this.filtre.verif = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.verif) + 1) % this.filtreEtat.length];
    } else if (value === 'type') {
      this.filtre.type = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.type) + 1) % this.filtreEtat.length];
    } else {
      this.filtre.next = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.next) + 1) % this.filtreEtat.length];
    }

   this.compService.setFiltre( this.filtre );
   this.compService.update();

  }

  ngOnInit() {


    this.searchControl = new FormControl('');

      this.filtre = this.compService.filtre ;
   //  this.compService.setFiltre( this.filtre );
     this.datas$ = this.compService.getList().pipe( shareReplay(1) ) ;
     this.compService.getListAll();
     this.dataSelected = null ;


/*
    this.datas$ = this.compService.getList().pipe(
      catchError(error => {
          console.error('denis' , error);
          return EMPTY;
      }),
      finalize(() => {
          console.log('Done!');

      }),
       shareReplay(1)
    );*/
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

