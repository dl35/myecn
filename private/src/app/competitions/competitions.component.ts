import { DataCompet } from './models/data-compet';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Pipe, Injectable, PipeTransform, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CompetitionsService } from './services/competitions.service';
import { Observable , Subscription } from 'rxjs';
import { filter , distinctUntilChanged , debounceTime} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import 'hammerjs';
import { MatDrawer, MatDialog, MatSnackBar } from '@angular/material';

import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MessageType, MessageResponse } from './models/message-response';



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



@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit , OnDestroy  {

  // searchfilter:searchText
   @ViewChild('mdrawer') mdrawer: MatDrawer;
  private searchControl: FormControl;
  private subscr: Subscription;


  private myfilter = {'verif': false , 'txt' : ''} ;



  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  datas$: Observable<DataCompet[]> ;
  dataSelected: DataCompet;



  private _mobileQueryListener: () => void;


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar,  changeDetectorRef: ChangeDetectorRef,
               media: MediaMatcher, private compService: CompetitionsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  private showSnackBar( message , info) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if ( !info ) {
      style = 'snack-error';
    }
    this.snackBar.open( message  , '', {
      duration: 1500,
      announcementMessage : 'denis',
      panelClass: [ style ]
    });
  }


  switchdrawer() {

    this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open() ;

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
                    this.compService.delete( data.id ).subscribe(
                        () => { this.compService.updateCache('delete', data); this.showSnackBar('Supression valide'  , true ); },
                        (error) =>  { this.showSnackBar( error   , false ); }

                    ); }},
         () => { },
         () => {},
       );

  }




  onQuitte(message: MessageResponse) {
  this.dataSelected = null;
  if ( message.type === MessageType.NONE ) {  return ; }
  this.showSnackBar( message.message  , message.success  );


  }

  doChange($event) {
  console.log( $event );
  this.myfilter.verif = $event.checked ;
  this.compService.search( this.myfilter );

  }

  ngOnInit() {



    this.searchControl = new FormControl('');
    this.subscr =  this.searchControl.valueChanges
        .pipe(
          // tap ( () =>  console.log( this.searchText.length ) ),
          filter(   (v: string) => ( v.length < this.myfilter.txt.length ) || v.length >= 3   ),
          debounceTime( 200 ),
          distinctUntilChanged()
          ).subscribe(query => {
          this.myfilter.txt = query ;
          this.compService.search(this.myfilter );

        });


     this.datas$ = this.compService.getList() ;
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
    this.subscr.unsubscribe();
  }

}

