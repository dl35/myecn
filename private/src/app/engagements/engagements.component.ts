import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';
import { CompetEngage, LicEngage } from './models/data-engage';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit , OnDestroy {

  @ViewChild('mdrawer') mdrawer: MatDrawer;


  loading = false;


  filter = {p0: true, p1: true, ex0: true, ex1: true, no0: true, no1: false };

//  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  datas: CompetEngage[] ;

  dataForm = new FormControl();

  idc: number ;
//  exist = false ;

  engage: LicEngage[];
  cachedDatas: LicEngage[] ;
//  indeterminate = true;

  destroyed$: Subject<any> = new Subject();

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eService: EngageService , private snackBar: MatSnackBar  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.engage = null ;
    console.log('create');
}

switchdrawer() {

  this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open() ;

}

  ngOnInit() {
   this.eService.getCompet().pipe(takeUntil(this.destroyed$)).subscribe(
    (datas)  => { this.datas = datas ; }

   );
  }

  setCompetition( id ) {
    this.idc = id ;
    this.loading = true;
    this.eService.getEngagement( id ).pipe(takeUntil(this.destroyed$)).subscribe(
        (res ) =>   {   if (  res.length === 0 ) {
                        this.engage  = null ; } else { 
                        this.engage = this.cachedDatas = res; this.showSnackBar( 'Engagements: ' + res.length , true );
                     }    }  ,
        (err ) =>   {  this.showSnackBar( err.error.message , false ); }  ,
        ( )   =>  this.loading = false
    );
  }

  ngOnDestroy(): void {
     this.destroyed$.next();
     this.destroyed$.complete();
   }

   doChange($event) {
    const v = $event.source.name  ;
    this.filter[v] = $event.checked ;
    let tmp = [];
    if ( this.filter.p0 && this.filter.p1  ) {
        tmp = this.cachedDatas;
      } else if ( this.filter.p0   )  {
        tmp = tmp.filter( item =>  item.eng.filter( e =>  e.presence === 'ko' ) ) ;
      } else if ( this.filter.p1  )  {
        tmp = tmp.filter( item =>  item.eng.filter( e =>  e.presence === 'ok' ) ) ;
      } else if ( this.filter.ex0 &&  !this.filter.ex1 )  {
        tmp = tmp.filter( item =>  item.extranat === '0'   ) ;
      } else if ( this.filter.ex1  &&  !this.filter.ex0 )  {
        tmp = tmp.filter( item =>  item.extranat === '1'   ) ;
      } else if ( this.filter.no0 &&  !this.filter.no1 )  {
        tmp = tmp.filter( item => item.notification === '0'   ) ;
      } else if ( this.filter.no1  &&  !this.filter.no0 )  {
        tmp = tmp.filter( item =>  item.notification !== '0' ) ;
      }

        this.engage = tmp ;
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
                this.loading = true;
                this.eService.sendMails( this.idc ).subscribe(
                    (res) => { this.showSnackBar('send mails ok'  , true );  this.setCompetition( this.idc ); },
                    (error) =>  { this.showSnackBar( error   , false ); },
                    () => this.loading = false

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
                                  this.loading = true;
                                  this.showSnackBar('ajout valide'  , true ); this.setCompetition( this.idc );
                                  // (error) =>  { this.showSnackBar( error   , false ); }
                               } },
                   () => {} ,
                   () => this.loading = false
                 );
                              }


}
