import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';
import { CompetEngage } from './models/data-engage';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit , OnDestroy {

  @ViewChild('mdrawer') mdrawer: MatDrawer;
  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  datas$: Observable<CompetEngage[]> ;

  toppings = new FormControl();

  idc: number ;
  exist = false ;

  subs$: Subscription;
  engage: any[]  ;
  indeterminate = true;


  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eService: EngageService , private snackBar: MatSnackBar  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.datas$ = this.eService.getCompet();
    this.engage = null ;
    console.log('create');
}

switchdrawer() {

  this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open() ;

}

  ngOnInit() {
   this.eService.getCompetNext();
  }

  setCompetition( id ) {
    this.idc = id ;
   this.subs$ = this.eService.getEngagement( id ).subscribe(
        (res =>   {   if (  res.length === 0 ) {
                        this.engage  = null ; } else {
                        this.engage = res; this.showSnackBar( 'Engagements: ' + res.length , true );
                     }    } ) ,
        (err =>   {  this.showSnackBar( err.error.message , false ); } ) ,

    );
  }
  ngOnDestroy(): void {
    if ( this.subs$ ) {
      this.subs$.unsubscribe();
    }

   }

   doChange($event, v ) {

      if ( v === 'pr' ) {
        this.engage = this.engage.filter( item =>  item.notification > 0   ) ;
      } else {

        this.engage = this.engage.filter( item =>  item.notification === 0   ) ;
      }

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

  public sendMails() {
    const dialogRef = this.dialog.open( DialogEngageComponent , {
      width: '60%',
      data: { id: this.idc , sendMails: true , info: 'Envoyer les emails ?'  },
      disableClose: true
     });


   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.eService.sendMails( this.idc ).subscribe(
                    (res) => { this.showSnackBar('send mails ok'  , true );  this.setCompetition( this.idc ); },
                    (error) =>  { this.showSnackBar( error   , false ); }

                ); } },
     () => {} ,
     () => {} ,
   );
                }

  public addLic() {
                  const dialogRef = this.dialog.open( DialogEngageComponent , {
                    width: '80%',
                    data: { id: this.idc, addLic : true , info: 'Ajouter des licencies ?'  },
                    disableClose: true
                   });
                 dialogRef.beforeClosed().subscribe(
                   (result) => {
                             if (result) {
                                  this.showSnackBar('ajout valide'  , true ); this.setCompetition( this.idc );
                                  //(error) =>  { this.showSnackBar( error   , false ); }
                               } },
                   () => {} ,
                   () => {} ,
                 );
                              }


}
